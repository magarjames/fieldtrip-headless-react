import { useEffect, useRef, useState } from "react";
import { ChibiHero } from "./Chibi";
import { shot } from "./media";

const STOPS = [
  {
    id: "gallery",
    label: "Gallery Day",
    place: "The white room",
    headline: "Clean lines. Loud room.",
    description: "Pale blue shirt, black wide trousers, and a chain at the hip.",
  },
  {
    id: "off-duty",
    label: "Off Duty",
    place: "Field Mart, 00:24",
    headline: "No plans. Still dressed.",
    description: "Backwards red cap, red bandana, a white tee, and cuffed jeans.",
  },
  {
    id: "rest",
    label: "Rest Day",
    place: "The half-court",
    headline: "Slow hours. Wide shapes.",
    description: "Sweater vest, white tee, wide brown shorts, and white sneakers.",
  },
] as const;

const ROUTES = [
  "M480 330C392 326 325 298 230 238",
  "M480 330C496 282 530 244 585 204",
  "M480 330C598 350 696 390 800 430",
] as const;

const CHAPTER_PROGRESS = [0.22, 0.5, 0.79] as const;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};

function chapterAt(progress: number) {
  if (progress < 0.1) return -1;
  if (progress < 0.38) return 0;
  if (progress < 0.67) return 1;
  return 2;
}

export function DestinationDiorama({ primaryHref }: { primaryHref: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef(-1);
  const [destinationIndex, setDestinationIndex] = useState(-1);
  const activeStop = destinationIndex >= 0 ? STOPS[destinationIndex] : null;
  const destination = activeStop?.id ?? "center";

  const setStageProgress = (progress: number) => {
    const stage = stageRef.current;
    if (!stage) return;

    const gallery = smoothstep(0.03, 0.2, progress);
    const offDuty = smoothstep(0.31, 0.49, progress);
    const rest = smoothstep(0.6, 0.79, progress);
    const galleryRoute = smoothstep(0.08, 0.25, progress);
    const offDutyRoute = smoothstep(0.37, 0.54, progress);
    const restRoute = smoothstep(0.66, 0.84, progress);

    const cameraX = progress < 0.5 ? 2.8 - progress * 5.6 : -((progress - 0.5) * 7.2);
    const cameraY = -smoothstep(0.1, 0.9, progress) * 1.6;
    const cameraScale = 1 + smoothstep(0, 1, progress) * 0.09;

    stage.style.setProperty("--scroll", progress.toFixed(4));
    stage.style.setProperty("--gallery-light", gallery.toFixed(4));
    stage.style.setProperty("--off-duty-light", offDuty.toFixed(4));
    stage.style.setProperty("--rest-light", rest.toFixed(4));
    stage.style.setProperty("--route-gallery", (1 - galleryRoute).toFixed(4));
    stage.style.setProperty("--route-off-duty", (1 - offDutyRoute).toFixed(4));
    stage.style.setProperty("--route-rest", (1 - restRoute).toFixed(4));
    stage.style.setProperty("--camera-x", `${cameraX.toFixed(3)}%`);
    stage.style.setProperty("--camera-y", `${cameraY.toFixed(3)}%`);
    stage.style.setProperty("--camera-scale", cameraScale.toFixed(4));

    const nextChapter = chapterAt(progress);
    if (nextChapter !== chapterRef.current) {
      chapterRef.current = nextChapter;
      setDestinationIndex(nextChapter);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp((window.scrollY - section.offsetTop) / range);
      setStageProgress(progress);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    if (!reducedMotion) {
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToStop = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const progress = CHAPTER_PROGRESS[index];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      chapterRef.current = index;
      setDestinationIndex(index);
      setStageProgress(progress);
      return;
    }

    const range = Math.max(1, section.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: section.offsetTop + range * progress,
      behavior: "smooth",
    });
  };

  const moveToNextStop = () => {
    scrollToStop((destinationIndex + 1) % STOPS.length);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !stageRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stageRef.current.style.setProperty("--pointer-x", `${(x * 0.8).toFixed(3)}%`);
    stageRef.current.style.setProperty("--pointer-y", `${(y * 0.55).toFixed(3)}%`);
  };

  return (
    <section
      ref={sectionRef}
      className="ft-diorama-scroll"
      aria-label="Choose a Fieldtrip destination"
    >
      <div
        ref={stageRef}
        className="ft-diorama"
        data-destination={destination}
        onPointerMove={handlePointerMove}
      >
        <style>{`
          .ft .ft-diorama-scroll{
            position:relative;
            min-height:390svh;
            background:#020305
          }
          .ft .ft-diorama{
            --scene-paper:#f3f3ef;
            --scene-dim:rgba(243,243,239,.7);
            --scene-line:rgba(216,236,255,.9);
            --scroll:0;
            --gallery-light:0;
            --off-duty-light:0;
            --rest-light:0;
            --route-gallery:1;
            --route-off-duty:1;
            --route-rest:1;
            --camera-x:0%;
            --camera-y:0%;
            --camera-scale:1;
            --pointer-x:0%;
            --pointer-y:0%;
            position:sticky;
            top:0;
            min-height:100svh;
            height:100svh;
            overflow:hidden;
            isolation:isolate;
            background:#020305;
            color:var(--scene-paper)
          }
          .ft .ft-diorama::before{
            content:"";
            position:absolute;
            inset:0;
            z-index:3;
            pointer-events:none;
            background:
              linear-gradient(90deg,rgba(2,3,5,.86) 0%,rgba(2,3,5,.28) 29%,transparent 57%,rgba(2,3,5,.22) 100%),
              linear-gradient(0deg,rgba(2,3,5,.8) 0%,transparent 42%)
          }
          .ft .ft-diorama::after{
            content:"";
            position:absolute;
            inset:0;
            z-index:10;
            opacity:.045;
            pointer-events:none;
            background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E")
          }
          .ft .ft-diorama-worlds{
            position:absolute;
            inset:-4%;
            z-index:1;
            transform:translate3d(calc(var(--camera-x) + var(--pointer-x)),calc(var(--camera-y) + var(--pointer-y)),0) scale(var(--camera-scale));
            transform-origin:50% 54%;
            will-change:transform
          }
          .ft .ft-diorama-world{
            position:absolute;
            inset:0;
            width:100%;
            height:100%;
            object-fit:cover;
            object-position:center;
            user-select:none;
            pointer-events:none
          }
          .ft .ft-diorama-world--gallery{ opacity:var(--gallery-light) }
          .ft .ft-diorama-world--off-duty{ opacity:var(--off-duty-light) }
          .ft .ft-diorama-world--rest{ opacity:var(--rest-light) }
          .ft .ft-diorama-light{
            position:absolute;
            z-index:2;
            width:22rem;
            aspect-ratio:1;
            border-radius:50%;
            opacity:0;
            filter:blur(48px);
            mix-blend-mode:screen;
            pointer-events:none
          }
          .ft .ft-diorama-light--gallery{
            left:13%;top:30%;
            background:rgba(255,240,206,.2);
            opacity:calc(var(--gallery-light) * .55)
          }
          .ft .ft-diorama-light--off-duty{
            left:43%;top:25%;
            background:rgba(102,190,255,.2);
            opacity:calc(var(--off-duty-light) * .52)
          }
          .ft .ft-diorama-light--rest{
            right:5%;top:45%;
            background:rgba(255,192,115,.18);
            opacity:calc(var(--rest-light) * .58)
          }
          .ft .ft-diorama-route{
            position:absolute;
            inset:0;
            z-index:4;
            width:100%;
            height:100%;
            pointer-events:none
          }
          .ft .ft-diorama-route path{
            fill:none;
            stroke:rgba(215,235,255,.22);
            stroke-width:1.6;
            stroke-linecap:round;
            stroke-dasharray:1;
            vector-effect:non-scaling-stroke
          }
          .ft .ft-diorama-route path:nth-of-type(1){ stroke-dashoffset:var(--route-gallery) }
          .ft .ft-diorama-route path:nth-of-type(2){ stroke-dashoffset:var(--route-off-duty) }
          .ft .ft-diorama-route path:nth-of-type(3){ stroke-dashoffset:var(--route-rest) }
          .ft .ft-diorama-route path.is-active{
            stroke:var(--scene-line);
            stroke-width:2.7;
            filter:url(#ft-route-glow)
          }
          .ft .ft-diorama-copy{
            position:absolute;
            left:clamp(1.25rem,3.25vw,4rem);
            bottom:clamp(1.75rem,5vh,4.5rem);
            z-index:7;
            width:min(42rem,44vw)
          }
          .ft .ft-diorama-copy-motion{
            animation:ft-copy-arrive .65s cubic-bezier(.16,1,.3,1) both
          }
          @keyframes ft-copy-arrive{
            from{ opacity:.25;filter:blur(12px);clip-path:inset(0 0 100% 0);transform:translateY(1.2rem) }
            to{ opacity:1;filter:blur(0);clip-path:inset(0);transform:translateY(0) }
          }
          .ft .ft-diorama-copy h1{
            max-width:8ch;
            font-size:clamp(3.1rem,5.5vw,6rem);
            line-height:.88;
            letter-spacing:-.04em;
            text-wrap:balance
          }
          .ft .ft-diorama-copy p{
            max-width:43ch;
            margin-top:1rem;
            color:var(--scene-dim);
            font-size:clamp(.82rem,1.05vw,1rem)
          }
          .ft .ft-diorama-action{
            display:inline-flex;
            min-height:3.25rem;
            margin-top:1.25rem;
            align-items:center;
            gap:2.5rem;
            padding:.1rem 1.1rem;
            border:1px solid rgba(243,243,239,.66);
            border-radius:.35rem;
            background:rgba(7,9,12,.72);
            color:var(--scene-paper);
            font-family:"JetBrains Mono",monospace;
            font-size:.72rem;
            letter-spacing:.13em;
            text-transform:uppercase;
            cursor:pointer;
            transition:background .25s ease,color .25s ease,transform .25s cubic-bezier(.16,1,.3,1)
          }
          .ft .ft-diorama-action:hover{
            background:var(--scene-paper);
            color:#080a0d;
            transform:translateY(-2px)
          }
          .ft .ft-diorama-action:focus-visible,
          .ft .ft-diorama-stop:focus-visible{
            outline:2px solid #fff;
            outline-offset:5px
          }
          .ft .ft-diorama-action:active{ transform:translateY(0) scale(.98) }
          .ft .ft-diorama-action-arrow{ font-size:1.25rem;line-height:1 }
          .ft .ft-diorama-figure{
            --figure-x:48%;
            --figure-y:53%;
            position:absolute;
            left:var(--figure-x);
            top:var(--figure-y);
            z-index:6;
            width:clamp(9.5rem,12vw,13.5rem);
            height:clamp(16rem,33vh,25rem);
            transform:translate(-50%,-50%);
            transition:left .9s cubic-bezier(.16,1,.3,1),top .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1);
            will-change:left,top,transform
          }
          .ft .ft-diorama[data-destination="gallery"] .ft-diorama-figure{
            --figure-x:27%;--figure-y:47%;transform:translate(-50%,-50%) scale(.9)
          }
          .ft .ft-diorama[data-destination="off-duty"] .ft-diorama-figure{
            --figure-x:56%;--figure-y:43%;transform:translate(-50%,-50%) scale(.9)
          }
          .ft .ft-diorama[data-destination="rest"] .ft-diorama-figure{
            --figure-x:77%;--figure-y:66%;transform:translate(-50%,-50%) scale(.9)
          }
          .ft .ft-diorama-figure::after{
            content:"";
            position:absolute;
            left:50%;
            bottom:12%;
            z-index:-1;
            width:42%;
            height:4%;
            transform:translateX(-50%);
            border-radius:50%;
            background:rgba(0,0,0,.58);
            filter:blur(9px)
          }
          .ft .ft-diorama-stop{
            position:absolute;
            z-index:7;
            display:grid;
            grid-template-columns:auto minmax(0,1fr);
            gap:.65rem;
            width:min(15rem,19vw);
            padding:0;
            border:0;
            background:transparent;
            color:var(--scene-paper);
            text-align:left;
            cursor:pointer
          }
          .ft .ft-diorama-stop--gallery{ left:18%;top:29% }
          .ft .ft-diorama-stop--off-duty{ left:57%;top:27% }
          .ft .ft-diorama-stop--rest{ right:7%;top:48% }
          .ft .ft-diorama-pin{
            position:relative;
            display:grid;
            width:1.65rem;
            height:1.65rem;
            place-items:center;
            border:2px solid rgba(243,243,239,.92);
            border-radius:50%;
            background:rgba(5,7,10,.72);
            box-shadow:0 8px 22px rgba(0,0,0,.35);
            transition:transform .25s ease,box-shadow .35s ease,background .25s ease
          }
          .ft .ft-diorama-pin::after{
            content:"";
            width:.48rem;
            height:.48rem;
            border-radius:50%;
            background:var(--scene-paper)
          }
          .ft .ft-diorama-stop:hover .ft-diorama-pin{ transform:scale(1.1) }
          .ft .ft-diorama-stop[aria-pressed="true"] .ft-diorama-pin{
            background:#e6f4ff;
            box-shadow:0 8px 22px rgba(0,0,0,.35),0 0 1.35rem rgba(207,234,255,.88)
          }
          .ft .ft-diorama-stop[aria-pressed="true"] .ft-diorama-pin::after{ background:#111820 }
          .ft .ft-diorama-stop-copy{ min-width:0 }
          .ft .ft-diorama-stop-title{
            display:block;
            font-family:"Archivo Black",Archivo,sans-serif;
            font-size:clamp(.8rem,1.1vw,1.05rem);
            line-height:1;
            letter-spacing:-.025em;
            text-transform:uppercase;
            text-shadow:0 2px 12px #000
          }
          .ft .ft-diorama-stop-place{
            display:block;
            margin-top:.33rem;
            color:rgba(243,243,239,.68);
            font-family:"JetBrains Mono",monospace;
            font-size:.58rem;
            letter-spacing:.07em;
            text-transform:uppercase
          }
          .ft .ft-diorama-stop-detail{
            display:block;
            max-height:0;
            margin-top:.5rem;
            overflow:hidden;
            color:rgba(243,243,239,.78);
            font-size:.68rem;
            line-height:1.4;
            opacity:0;
            transition:opacity .35s ease
          }
          .ft .ft-diorama-stop[aria-pressed="true"] .ft-diorama-stop-detail{
            max-height:4rem;
            opacity:1
          }
          .ft .ft-diorama-scroll-cue{
            position:absolute;
            left:50%;
            bottom:1.2rem;
            z-index:7;
            display:flex;
            align-items:center;
            gap:.75rem;
            transform:translateX(-50%);
            color:rgba(243,243,239,.55);
            pointer-events:none
          }
          .ft .ft-diorama-scroll-cue::before{
            content:"";
            display:block;
            width:3.5rem;
            height:1px;
            background:linear-gradient(90deg,#eaf5ff calc(var(--scroll) * 100%),rgba(243,243,239,.2) 0)
          }
          .ft .ft-diorama-status{
            position:absolute;
            right:clamp(1.25rem,2.5vw,3rem);
            bottom:clamp(1.25rem,3.5vh,3rem);
            z-index:7;
            display:flex;
            align-items:center;
            gap:.7rem;
            color:rgba(243,243,239,.62)
          }
          .ft .ft-diorama-status-dot{
            width:.42rem;
            height:.42rem;
            border-radius:50%;
            background:#dcefff;
            box-shadow:0 3px .75rem rgba(220,239,255,.72)
          }
          @media (max-width:900px){
            .ft .ft-diorama-scroll{ min-height:325svh }
            .ft .ft-diorama::before{
              background:linear-gradient(0deg,rgba(2,3,5,.97) 0%,rgba(2,3,5,.22) 61%,rgba(2,3,5,.52) 100%)
            }
            .ft .ft-diorama-worlds{
              inset:0;
              left:50%;
              top:7%;
              width:max(86rem,240vw);
              height:67%;
              transform:translate3d(calc(-50% + var(--camera-x)),var(--camera-y),0) scale(var(--camera-scale));
              transform-origin:center
            }
            .ft .ft-diorama-route{ display:none }
            .ft .ft-diorama-copy{
              left:1rem;
              right:1rem;
              bottom:8.8rem;
              width:auto
            }
            .ft .ft-diorama-copy h1{ max-width:8ch;font-size:clamp(3rem,14vw,5.3rem) }
            .ft .ft-diorama-copy p{ max-width:34ch;font-size:.82rem }
            .ft .ft-diorama-action{ display:none }
            .ft .ft-diorama-figure{
              --figure-x:50%;--figure-y:41%;
              width:10rem;
              height:18rem
            }
            .ft .ft-diorama[data-destination="gallery"] .ft-diorama-figure,
            .ft .ft-diorama[data-destination="off-duty"] .ft-diorama-figure,
            .ft .ft-diorama[data-destination="rest"] .ft-diorama-figure{
              --figure-x:50%;--figure-y:41%;transform:translate(-50%,-50%) scale(.92)
            }
            .ft .ft-diorama-stop{
              position:relative;
              left:auto;
              right:auto;
              top:auto;
              width:auto;
              min-width:max-content;
              grid-template-columns:auto;
              gap:.35rem;
              padding:.7rem .8rem;
              border-left:1px solid rgba(243,243,239,.22)
            }
            .ft .ft-diorama-stop--gallery{ border-left:0 }
            .ft .ft-diorama-stops{
              position:absolute;
              left:1rem;
              right:1rem;
              bottom:1rem;
              z-index:9;
              display:flex;
              justify-content:space-between;
              border:1px solid rgba(243,243,239,.2);
              background:rgba(6,8,11,.88)
            }
            .ft .ft-diorama-pin{ width:1.25rem;height:1.25rem;border-width:1.5px }
            .ft .ft-diorama-pin::after{ width:.34rem;height:.34rem }
            .ft .ft-diorama-stop-title{ font-size:.66rem }
            .ft .ft-diorama-stop-place,.ft .ft-diorama-stop-detail{ display:none }
            .ft .ft-diorama-status,.ft .ft-diorama-scroll-cue{ display:none }
          }
          @media (max-width:520px){
            .ft .ft-diorama-worlds{ width:max(76rem,310vw);height:60%;top:9% }
            .ft .ft-diorama-copy{ bottom:8.1rem }
            .ft .ft-diorama-copy p{ max-width:30ch }
            .ft .ft-diorama-stop{ padding:.65rem .48rem }
            .ft .ft-diorama-stop-title{ font-size:.57rem;letter-spacing:0 }
          }
          @media (prefers-reduced-motion:reduce){
            .ft .ft-diorama-scroll{ min-height:100svh }
            .ft .ft-diorama{ position:relative }
            .ft .ft-diorama-worlds,.ft .ft-diorama-figure,.ft .ft-diorama-stop-detail{ transition:none }
            .ft .ft-diorama-copy-motion{ animation:none }
          }
        `}</style>

        <div className="ft-diorama-worlds" aria-hidden="true">
          <img
            className="ft-diorama-world ft-diorama-world--base"
            src="/fieldtrip/destination-city.png"
            alt=""
            width={1664}
            height={936}
            fetchPriority="high"
          />
          <img
            className="ft-diorama-world ft-diorama-world--gallery"
            src="/fieldtrip/destination-gallery.png"
            alt=""
            width={1664}
            height={941}
            loading="eager"
            decoding="async"
          />
          <img
            className="ft-diorama-world ft-diorama-world--off-duty"
            src="/fieldtrip/destination-off-duty.png"
            alt=""
            width={1664}
            height={941}
            loading="eager"
            decoding="async"
          />
          <img
            className="ft-diorama-world ft-diorama-world--rest"
            src="/fieldtrip/destination-rest.png"
            alt=""
            width={1664}
            height={941}
            loading="eager"
            decoding="async"
          />
        </div>

        <span className="ft-diorama-light ft-diorama-light--gallery" aria-hidden="true" />
        <span className="ft-diorama-light ft-diorama-light--off-duty" aria-hidden="true" />
        <span className="ft-diorama-light ft-diorama-light--rest" aria-hidden="true" />

        <svg
          className="ft-diorama-route"
          viewBox="0 0 1000 560"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="ft-route-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {ROUTES.map((route, index) => (
            <path
              key={route}
              d={route}
              pathLength={1}
              className={destinationIndex === index ? "is-active" : ""}
            />
          ))}
        </svg>

        <div className="ft-diorama-copy" aria-live="polite">
          <div className="ft-diorama-copy-motion" key={activeStop?.id ?? "intro"}>
            <h1 id="ft-diorama-title">{activeStop?.headline ?? "Where are we dressing for?"}</h1>
            <p>
              {activeStop?.description ??
                "Scroll through the city. Each stop powers on a different fit for a different version of the night."}
            </p>
          </div>
          <button className="ft-diorama-action" type="button" onClick={moveToNextStop}>
            {activeStop ? "Next stop" : "Enter the city"}
            <span className="ft-diorama-action-arrow" aria-hidden="true">
              &rarr;
            </span>
          </button>
        </div>

        <div className="ft-diorama-figure" aria-label="Chibby models the selected outfit">
          <ChibiHero
            fallbackSrc={shot("ft-hero", 900, 1200)}
            layout="map"
            outfitIndex={destinationIndex >= 0 ? destinationIndex : 0}
            onOutfitChange={scrollToStop}
            showControls={false}
          />
        </div>

        <div className="ft-diorama-stops" id="diorama-destinations">
          {STOPS.map((stop, index) => (
            <button
              key={stop.id}
              className={`ft-diorama-stop ft-diorama-stop--${stop.id}`}
              type="button"
              aria-pressed={destinationIndex === index}
              onClick={() => scrollToStop(index)}
            >
              <span className="ft-diorama-pin" aria-hidden="true" />
              <span className="ft-diorama-stop-copy">
                <span className="ft-diorama-stop-title">{stop.label}</span>
                <span className="ft-diorama-stop-place">{stop.place}</span>
                <span className="ft-diorama-stop-detail">{stop.description}</span>
              </span>
            </button>
          ))}
        </div>

        <span className="ft-diorama-scroll-cue lbl" aria-hidden="true">
          Scroll to travel
        </span>

        <a className="ft-diorama-status lbl" href={primaryHref}>
          <span className="ft-diorama-status-dot" aria-hidden="true" />
          {activeStop ? `Shop ${activeStop.label}` : "Collection follows the route"}
        </a>
      </div>
    </section>
  );
}
