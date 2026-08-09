import { useEffect, useRef } from "react";

export type NorthlineFrameSequenceConfig = {
  basePath: string;
  highResBasePath?: string;
  highResMinWidth?: number;
  frameCount: number;
  extension?: string;
  prefix?: string;
  pad?: number;
};

type NorthlineFrameSequenceProps = {
  sequence: NorthlineFrameSequenceConfig;
  poster: string;
  alt: string;
  eager?: boolean;
};

type CachedFrame = {
  image: HTMLImageElement;
  ready: boolean;
  lastUsed: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export function NorthlineFrameSequence({
  sequence,
  poster,
  alt,
  eager = false,
}: NorthlineFrameSequenceProps) {
  const figureRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    basePath,
    highResBasePath,
    highResMinWidth = 921,
    frameCount,
    extension = "webp",
    prefix = "frame-",
    pad = 3,
  } = sequence;

  useEffect(() => {
    const figure = figureRef.current;
    const canvas = canvasRef.current;
    const step = figure?.closest<HTMLElement>(".nl-film-step");

    if (!figure || !canvas || !step || frameCount < 1) return;

    const copyNodes = [...step.querySelectorAll<HTMLElement>("[data-film-copy]")];
    const posterImage = figure.querySelector<HTMLImageElement>(".nl-film-poster");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = canvas.getContext("2d", { alpha: false });

    if (reducedMotion || !context) return;

    step.classList.add("is-film-motion-ready");

    const selectedBasePath =
      highResBasePath && window.innerWidth >= highResMinWidth ? highResBasePath : basePath;
    const normalizedBasePath = selectedBasePath.replace(/\/$/, "");
    const cache = new Map<number, CachedFrame>();
    const mobileSequence = window.innerWidth <= 767;
    const maxDecodedFrames = mobileSequence ? 4 : 8;
    const preloadRadius = mobileSequence ? 1 : 2;
    let active = false;
    let disposed = false;
    let currentProgress = 0;
    let targetProgress = 0;
    let lastDrawnFrame = -1;
    let measurementQueued = false;
    let animationFrame = 0;
    let lastViewportWidth = window.innerWidth;

    const frameUrl = (index: number) => {
      const frameNumber = String(index + 1).padStart(pad, "0");
      return `${normalizedBasePath}/${prefix}${frameNumber}.${extension}`;
    };

    const updateCopyMotion = (progress: number) => {
      const copyCount = copyNodes.length;
      if (copyCount === 0) return;

      const segment = 1 / copyCount;
      const overlap = 0.05;
      const fadeDistance = 0.09;
      const motionVectors = [
        { enterX: 7, enterY: 2, exitX: -3, exitY: -3, arcX: -1.2, arcY: -1.4 },
        { enterX: -7, enterY: -1, exitX: 4, exitY: 3, arcX: 1.3, arcY: 1.6 },
        { enterX: -5, enterY: 6, exitX: 2, exitY: -2, arcX: 1, arcY: -1.8 },
      ];

      copyNodes.forEach((node, index) => {
        const start = index === 0 ? -fadeDistance : index * segment - overlap;
        const end = index === copyCount - 1 ? 1 + fadeDistance : (index + 1) * segment + overlap;
        const enter = smoothstep(clamp((progress - start) / fadeDistance));
        const exit = smoothstep(clamp((end - progress) / fadeDistance));
        const opacity = Math.min(enter, exit);
        const localProgress = clamp((progress - start) / (end - start));
        const arc = Math.sin(localProgress * Math.PI);
        const vector = motionVectors[index % motionVectors.length];
        const x = (1 - enter) * vector.enterX + (1 - exit) * vector.exitX + arc * vector.arcX;
        const y = (1 - enter) * vector.enterY + (1 - exit) * vector.exitY + arc * vector.arcY;

        node.style.setProperty("--nl-film-copy-opacity", opacity.toFixed(4));
        node.style.setProperty("--nl-film-copy-x", `${x.toFixed(3)}vw`);
        node.style.setProperty("--nl-film-copy-y", `${y.toFixed(3)}vh`);
        node.style.setProperty("--nl-film-copy-scale", (0.965 + opacity * 0.035).toFixed(4));
        node.style.setProperty("--nl-film-copy-blur", `${((1 - opacity) * 9).toFixed(2)}px`);
        node.classList.toggle("is-active", opacity > 0.45);
      });
    };

    const drawFrame = (index: number) => {
      const record = cache.get(index);
      if (!record?.ready || disposed || record.image.naturalWidth === 0) return;

      if (
        canvas.width !== record.image.naturalWidth ||
        canvas.height !== record.image.naturalHeight
      ) {
        canvas.width = record.image.naturalWidth;
        canvas.height = record.image.naturalHeight;
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(record.image, 0, 0, canvas.width, canvas.height);
      record.lastUsed = performance.now();
      lastDrawnFrame = index;
      figure.classList.add("is-sequence-ready");
    };

    const pruneCache = (center: number) => {
      if (cache.size <= maxDecodedFrames) return;

      const candidates = [...cache.keys()]
        .filter((index) => index !== lastDrawnFrame)
        .sort((left, right) => Math.abs(right - center) - Math.abs(left - center));

      while (cache.size > maxDecodedFrames && candidates.length > 0) {
        const index = candidates.shift();
        if (index === undefined) break;
        const record = cache.get(index);
        if (record) record.image.src = "";
        cache.delete(index);
      }
    };

    const ensureFrame = (requestedIndex: number, shouldDraw = false) => {
      const index = Math.round(clamp(requestedIndex, 0, frameCount - 1));
      const existing = cache.get(index);

      if (existing) {
        existing.lastUsed = performance.now();
        if (shouldDraw && existing.ready) drawFrame(index);
        return;
      }

      const image = new Image();
      const record: CachedFrame = { image, ready: false, lastUsed: performance.now() };
      cache.set(index, record);

      image.decoding = "async";
      image.onload = () => {
        if (disposed || cache.get(index) !== record) return;
        record.ready = true;
        const desiredFrame = Math.round(currentProgress * (frameCount - 1));
        if (shouldDraw || Math.abs(desiredFrame - index) <= 1) drawFrame(index);
      };
      image.src = frameUrl(index);
      pruneCache(index);
    };

    const primeWindow = (center: number) => {
      ensureFrame(center, true);
      for (let distance = 1; distance <= preloadRadius; distance += 1) {
        ensureFrame(center + distance);
        ensureFrame(center - distance);
      }
      pruneCache(center);
    };

    const readProgress = () => {
      measurementQueued = false;
      const bounds = step.getBoundingClientRect();
      const scrollDistance = Math.max(1, bounds.height - window.innerHeight);
      targetProgress = clamp(-bounds.top / scrollDistance);

      if (active) {
        primeWindow(Math.round(targetProgress * (frameCount - 1)));
      }
    };

    const scheduleMeasurement = () => {
      if (measurementQueued) return;
      measurementQueued = true;
      requestAnimationFrame(readProgress);
    };

    const render = () => {
      const difference = targetProgress - currentProgress;
      currentProgress =
        Math.abs(difference) < 0.0001 ? targetProgress : currentProgress + difference * 0.18;
      step.style.setProperty("--nl-film-sequence-progress", currentProgress.toFixed(5));
      updateCopyMotion(currentProgress);

      if (lastViewportWidth <= 640) {
        const objectPosition = `${(48 + currentProgress * 10).toFixed(2)}% center`;
        canvas.style.objectPosition = objectPosition;
        if (posterImage) posterImage.style.objectPosition = objectPosition;
      } else {
        canvas.style.removeProperty("object-position");
        posterImage?.style.removeProperty("object-position");
      }

      if (active || Math.abs(difference) > 0.0001) {
        const frame = Math.round(currentProgress * (frameCount - 1));
        if (frame !== lastDrawnFrame) ensureFrame(frame, true);
      }

      animationFrame = requestAnimationFrame(render);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (!active) return;
        readProgress();
        primeWindow(Math.round(targetProgress * (frameCount - 1)));
      },
      { rootMargin: mobileSequence ? "35% 0px" : "70% 0px" },
    );

    const onResize = () => {
      if (window.innerWidth === lastViewportWidth) return;
      lastViewportWidth = window.innerWidth;
      scheduleMeasurement();
    };

    intersectionObserver.observe(step);
    window.addEventListener("scroll", scheduleMeasurement, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    readProgress();
    animationFrame = requestAnimationFrame(render);

    return () => {
      disposed = true;
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", scheduleMeasurement);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrame);
      cache.forEach((record) => {
        record.image.src = "";
      });
      figure.classList.remove("is-sequence-ready");
      step.classList.remove("is-film-motion-ready");
      canvas.style.removeProperty("object-position");
      posterImage?.style.removeProperty("object-position");
      step.style.removeProperty("--nl-film-sequence-progress");
      copyNodes.forEach((node) => {
        node.classList.remove("is-active");
        node.style.removeProperty("--nl-film-copy-opacity");
        node.style.removeProperty("--nl-film-copy-x");
        node.style.removeProperty("--nl-film-copy-y");
        node.style.removeProperty("--nl-film-copy-scale");
        node.style.removeProperty("--nl-film-copy-blur");
      });
    };
  }, [basePath, extension, frameCount, highResBasePath, highResMinWidth, pad, prefix]);

  return (
    <figure ref={figureRef} className="nl-film-media nl-film-sequence">
      <img
        className="nl-film-poster"
        src={poster}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      <canvas
        ref={canvasRef}
        className="nl-film-sequence-canvas"
        width={1}
        height={1}
        aria-hidden="true"
      />
    </figure>
  );
}
