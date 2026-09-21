import { chartAit, chartPoints, chartRpa } from "@/lib/site-data";

const W = 860;
const H = 360;
const L = 64;
const R = 24;
const TOP = 18;
const B = 56;
const MAX = 200;
const GRID_VALUES = [0, 50, 100, 150, 200];

const x = (i: number) => L + (i * (W - L - R)) / (chartPoints.length - 1);
const y = (v: number) => H - B - (v / MAX) * (H - B - TOP);
const path = (arr: number[]) => arr.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join(" ");

export function CostComparisonChart() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="auto"
      role="img"
      style={{ display: "block", overflow: "visible" }}
      aria-label="Line chart of illustrative cumulative cost index over implementation and three years. Licensed enterprise RPA rises from 55 to 190. AutomateIT rises from 22 to 60."
    >
      <g>
        {GRID_VALUES.map((v) => (
          <g key={v}>
            <line
              x1={L}
              x2={W - R}
              y1={y(v)}
              y2={y(v)}
              strokeWidth={1}
              style={{ stroke: "var(--color-border)" }}
            />
            <text
              x={L - 12}
              y={y(v) + 4}
              textAnchor="end"
              fontSize={13}
              fontFamily="var(--font-mono), monospace"
              style={{ fill: "var(--color-faint)" }}
            >
              {v}
            </text>
          </g>
        ))}
      </g>

      <text
        transform={`rotate(-90 18 ${(H - B + TOP) / 2})`}
        x={18}
        y={(H - B + TOP) / 2}
        textAnchor="middle"
        fontSize={13}
        fontFamily="var(--font-sans), sans-serif"
        style={{ fill: "var(--color-faint)" }}
      >
        Illustrative cumulative cost index
      </text>

      <g>
        {chartPoints.map((p, i) => (
          <text
            key={p}
            x={x(i)}
            y={H - B + 26}
            textAnchor={i === 0 ? "start" : i === chartPoints.length - 1 ? "end" : "middle"}
            fontSize={14}
            fontFamily="var(--font-sans), sans-serif"
            style={{ fill: "var(--color-muted)" }}
          >
            {p}
          </text>
        ))}
      </g>

      <path
        d={path(chartRpa)}
        fill="none"
        strokeWidth={3.5}
        strokeLinecap="round"
        style={{ stroke: "var(--color-neutralline)" }}
      />
      <path
        d={path(chartAit)}
        fill="none"
        strokeWidth={3.5}
        strokeLinecap="round"
        style={{ stroke: "var(--color-accent2)" }}
      />

      <g>
        {chartRpa.map((v, i) => (
          <circle
            key={`r${i}`}
            cx={x(i)}
            cy={y(v)}
            r={5}
            strokeWidth={2}
            style={{ fill: "var(--color-neutralline)", stroke: "var(--color-card)" }}
          />
        ))}
      </g>
      <g>
        {chartAit.map((v, i) => (
          <circle
            key={`a${i}`}
            cx={x(i)}
            cy={y(v)}
            r={5}
            strokeWidth={2}
            style={{ fill: "var(--color-accent2)", stroke: "var(--color-card)" }}
          />
        ))}
      </g>

      <line
        x1={x(2) + 14}
        x2={x(3) - 12}
        y1={y(88)}
        y2={y(64)}
        strokeWidth={1.5}
        style={{ stroke: "var(--color-accent2)" }}
      />
      <text
        x={x(2) + 8}
        y={y(88) + 5}
        textAnchor="end"
        fontSize={15}
        fontWeight={600}
        fontFamily="var(--font-sans), sans-serif"
        style={{ fill: "var(--color-accent2)" }}
      >
        Lower initial and ongoing costs
      </text>
    </svg>
  );
}
