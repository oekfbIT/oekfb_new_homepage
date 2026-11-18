import { LineupPlayer } from "./analysisUtils";

/** Round player photo (falls back to the shirt number). */
export default function PlayerAvatar({ player, number, size = 44 }: { player?: LineupPlayer; number?: number; size?: number }) {
  const n = player?.number ?? number;
  return (
    <span className="ma-avatar" style={{ width: size, height: size }}>
      {player?.image ? <img src={player.image} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : null}
      <span className="ma-avatar__num">{n != null ? n : "?"}</span>
    </span>
  );
}
