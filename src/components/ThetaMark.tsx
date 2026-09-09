import { THETA_SMALL, THETA_SMALL_GRID } from "./thetaPath";

/** The pixel theta at UI scale. Sized in multiples of 24 to stay crisp. */
export default function ThetaMark({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${THETA_SMALL_GRID} ${THETA_SMALL_GRID}`}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      <path d={THETA_SMALL} fill="currentColor" />
    </svg>
  );
}
