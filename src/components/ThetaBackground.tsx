export default function ThetaBackground() {
  return (
    <div className="theta-bg" aria-hidden="true">
      <svg viewBox="150 80 380 370" xmlns="http://www.w3.org/2000/svg" fill="none">
        <g transform="translate(340 260) rotate(-6)">
          <path
            d="M 0 -140 C 70 -140, 115 -85, 118 -5 C 121 75, 78 138, 5 142 C -70 145, -118 88, -120 5 C -122 -78, -75 -138, -2 -141 Z M -4 -120 C -62 -116, -100 -65, -98 5 C -96 72, -58 122, 4 122 C 64 122, 100 70, 100 0 C 100 -70, 60 -120, 0 -120 Z"
            fill="#ebdcbe"
            fillRule="evenodd"
          />
          <path
            d="M -138 18 C -100 -22, -55 -28, -15 -6 C 25 16, 75 14, 142 -22"
            stroke="#ebdcbe"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
