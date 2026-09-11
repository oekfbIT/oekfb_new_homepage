import { useEffect, useState } from "react";
import ClientController from "../../network/ClientController";
import "./style.css";

type Achievement = { id: string; label: string; imageUrl?: string | null };

export default function AchievementsSection({ ownerType, ownerId }: { ownerType: "team" | "player"; ownerId?: string }) {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    setItems([]);
    setError(false);
    setLoading(true);
    if (!ownerId) { setLoading(false); return; }
    new ClientController().fetchAchievements(ownerType, ownerId)
      .then(data => { if (active) setItems(data); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [ownerType, ownerId]);
  if (loading || error || items.length === 0) return null;
  return <section className="achievements-section" aria-label="Erfolge und Auszeichnungen">
    <h2 className="sub_header md_base">Erfolge &amp; Auszeichnungen</h2>
      <ul className="stats-grid achievements-section__list">{items.map(item => <li key={item.id} className="achievements-section__card">
        <span className="achievements-section__image">{item.imageUrl ? <img key={item.imageUrl} src={item.imageUrl} alt="" loading="lazy" onError={event => { event.currentTarget.style.display = "none"; }} /> : <span aria-hidden="true" className="achievements-section__trophy">🏆</span>}</span>
        <span>{item.label}</span>
      </li>)}</ul>
  </section>;
}
