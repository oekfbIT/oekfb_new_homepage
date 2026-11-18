import { useEffect, useMemo, useState } from "react";
import ClientController from "../../network/ClientController";
import ClipRail from "./ClipRail";
import { ClipCardData } from "./videoUtils";
import "./style.css";

/** "Videos" section for player and team pages. Renders nothing until there are clips. */
export default function ClipsSection({ ownerType, ownerId, name }: { ownerType: "player" | "team"; ownerId?: string; name?: string }) {
  const [items, setItems] = useState<ClipCardData[]>([]);
  useEffect(() => {
    let active = true;
    setItems([]);
    if (!ownerId) return;
    const api = new ClientController();
    (ownerType === "player" ? api.fetchPlayerClips(ownerId) : api.fetchTeamClips(ownerId))
      .then((data: ClipCardData[]) => { if (active) setItems(Array.isArray(data) ? data : []); })
      .catch(() => {});
    return () => { active = false; };
  }, [ownerType, ownerId]);

  const goals = useMemo(() => items.filter((i) => i.clip.type === "goal" || i.clip.type === "penalty"), [items]);
  const other = useMemo(() => items.filter((i) => !(i.clip.type === "goal" || i.clip.type === "penalty")), [items]);
  if (!items.length) return null;
  return (
    <section className="clips-section" aria-label="Videos">
      <ClipRail title={`${name ? `${name} ` : ""}Tore`} items={goals} />
      <ClipRail title={goals.length ? "Weitere Highlights" : `${name ? `${name} ` : ""}Highlights`} items={other} />
    </section>
  );
}
