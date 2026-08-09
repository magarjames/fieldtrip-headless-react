export type NorthlineEdgeMotionV8 = {
  progress: number;
};

const EDGE_PATH =
  "M0 74 C34 63 52 48 83 57 C104 65 119 46 143 51 C170 58 185 40 212 47 C246 59 261 67 290 56 C319 44 336 58 363 52 C390 45 407 62 437 54 C466 44 489 42 514 55 C544 69 562 47 590 51 C624 58 643 39 670 49 C702 61 724 51 751 48 C782 45 796 61 824 55 C855 48 873 37 902 49 C931 63 951 51 977 54 C1009 58 1028 41 1056 48 C1090 59 1111 68 1139 57 C1168 45 1190 49 1218 54 C1252 60 1270 43 1297 49 C1328 58 1350 68 1378 58 C1404 49 1420 52 1446 47 C1480 40 1505 61 1535 53 C1560 47 1583 42 1600 50 L1600 140 L0 140 Z";

function FlowingEdgeV8({ colour, toneStrength }: { colour: string; toneStrength: number }) {
  return (
    <svg
      className="nl-scroll-edge-fallback"
      viewBox="0 0 1600 140"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path className="nl-scroll-edge-shadow" d={EDGE_PATH} fill="rgba(0, 13, 16, 0.12)" />
      <path
        className="nl-scroll-edge-surface"
        d={EDGE_PATH}
        fill={colour}
        style={{ opacity: Math.max(0.92, 1 - toneStrength * 0.015) }}
      />
    </svg>
  );
}

export function NorthlineScrollEdgeV8({
  motion: _motion,
  colour = "#ffffff",
  toneStrength = 1,
  className = "nl-collection-edge",
}: {
  motion: { current: NorthlineEdgeMotionV8 };
  colour?: string;
  toneStrength?: number;
  className?: string;
}) {
  return (
    <div className={`nl-scroll-edge ${className}`} aria-hidden="true">
      <FlowingEdgeV8 colour={colour} toneStrength={toneStrength} />
    </div>
  );
}
