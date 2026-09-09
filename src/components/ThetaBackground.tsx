import { THETA_RING, THETA_WAVE, THETA_GRID } from "./thetaPath";

export default function ThetaBackground() {
  return (
    <div className="theta-bg" aria-hidden="true">
      {/* No crispEdges here: the mark rotates and is scaled to a non-integer
          multiple of the grid, so snapping would give pixels uneven widths. */}
      <svg viewBox={`0 0 ${THETA_GRID} ${THETA_GRID}`} xmlns="http://www.w3.org/2000/svg">
        <path d={THETA_RING} fill="currentColor" />
        <path className="theta-wave" d={THETA_WAVE} fill="currentColor" />
      </svg>
    </div>
  );
}
