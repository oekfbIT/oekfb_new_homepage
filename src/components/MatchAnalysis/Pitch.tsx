import { ReactNode } from "react";

export const PITCH_W = 1000, PITCH_H = 600, PAD = 24;
export const px = (x: number) => PAD + x * (PITCH_W - 2 * PAD);
export const py = (y: number) => PAD + y * (PITCH_H - 2 * PAD);

/** Light Kleinfeld pitch (home attacks →). Children are drawn on top in pitch coordinates via px/py. */
export default function Pitch({ children, homeName, awayName }: { children?: ReactNode; homeName?: string; awayName?: string }) {
  const w = PITCH_W - 2 * PAD, h = PITCH_H - 2 * PAD, boxW = w * 0.15, boxH = h * 0.5;
  return (
    <div className="ma-pitch">
      {(homeName || awayName) && (
        <div className="ma-pitch__dir">
          <span><i className="ma-dot ma-dot--home" />{homeName} →</span>
          <span>← {awayName}<i className="ma-dot ma-dot--away" /></span>
        </div>
      )}
      <svg viewBox={`0 0 ${PITCH_W} ${PITCH_H}`} role="img">
        <rect x={PAD} y={PAD} width={w} height={h} rx="10" className="ma-pitch__grass" />
        <g className="ma-pitch__lines">
          <rect x={PAD} y={PAD} width={w} height={h} rx="10" />
          <line x1={PITCH_W / 2} y1={PAD} x2={PITCH_W / 2} y2={PITCH_H - PAD} />
          <circle cx={PITCH_W / 2} cy={PITCH_H / 2} r={h * 0.15} />
          <circle cx={PITCH_W / 2} cy={PITCH_H / 2} r="4" className="ma-pitch__spot" />
          <rect x={PAD} y={(PITCH_H - boxH) / 2} width={boxW} height={boxH} />
          <rect x={PITCH_W - PAD - boxW} y={(PITCH_H - boxH) / 2} width={boxW} height={boxH} />
          <line x1={PAD - 6} y1={PITCH_H / 2 - 36} x2={PAD - 6} y2={PITCH_H / 2 + 36} className="ma-pitch__goal" />
          <line x1={PITCH_W - PAD + 6} y1={PITCH_H / 2 - 36} x2={PITCH_W - PAD + 6} y2={PITCH_H / 2 + 36} className="ma-pitch__goal" />
        </g>
        {children}
      </svg>
    </div>
  );
}
