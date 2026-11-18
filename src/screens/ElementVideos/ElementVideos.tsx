import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClipRail from "../../components/Videos/ClipRail";
import { ClipCardData, VideoMatch, formatDate } from "../../components/Videos/videoUtils";
import "../../components/Videos/style.css";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

type MatchCard = { match: VideoMatch; recording_url?: string; thumbnail_url?: string; clip_count: number };

/** Videos page: latest matches with video, all goals grouped by matchday, other highlights. */
export const ElementVideos = (): JSX.Element => {
  const isMobile = useWindowWidth() < 900;
  const [matches, setMatches] = useState<MatchCard[]>([]);
  const [clips, setClips] = useState<ClipCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const code = new AuthService().getLeagueCode();
    if (!code) { setLoading(false); return; }
    new ClientController().fetchLeagueVideos(code)
      .then((data: any) => { setMatches(data?.matches ?? []); setClips(data?.clips ?? []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const isGoal = (c: ClipCardData) => c.clip.type === "goal" || c.clip.type === "penalty";
  const goalsByGameday = useMemo(() => {
    const groups = new Map<number, ClipCardData[]>();
    clips.filter(isGoal).forEach((c) => {
      const day = c.match?.gameday ?? 0;
      groups.set(day, [...(groups.get(day) ?? []), c]);
    });
    return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
  }, [clips]);
  const highlights = useMemo(() => clips.filter((c) => !isGoal(c)).slice(0, 30), [clips]);

  return (
    <div className="element-videos" style={{ minWidth: isMobile ? "390px" : "900px" }}>
      {isMobile ? <Navigation /> : <DesktopNav />}
      <div className="videos-page">
        <PageHeader className="instance-node-10" text="Videos" />
        {loading ? <LoadingIndicator /> : !matches.length && !clips.length ? (
          <p className="p videos-page__empty">Für diese Liga gibt es noch keine Videos.</p>
        ) : (
          <>
            {matches.length > 0 && (
              <section className="videos-page__section">
                <h2 className="sub_header md_base">Spiele</h2>
                <div className="clip-rail__track videos-page__matches">
                  {matches.map((m) => (
                    <Link key={m.match.id} to={`/match/${m.match.id}`} className="clip-card match-video-card">
                      <span className="clip-card__thumb">
                        {m.thumbnail_url ? <img src={m.thumbnail_url} alt="" loading="lazy" /> : (
                          <span className="match-video-card__logos">
                            {m.match.home_logo && <img src={m.match.home_logo} alt="" />}
                            {m.match.away_logo && <img src={m.match.away_logo} alt="" />}
                          </span>
                        )}
                        <span className="clip-card__badge">{m.clip_count} Clips <span className="clip-card__play">▶</span></span>
                        <span className="clip-card__caption">
                          <span className="clip-card__title">{m.match.home_name} {m.match.score?.home}–{m.match.score?.away} {m.match.away_name}</span>
                          <span className="clip-card__sub">{m.match.gameday}. Spieltag{m.match.date ? ` · ${formatDate(m.match.date)}` : ""}</span>
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {goalsByGameday.length > 0 && (
              <section className="videos-page__section">
                <h2 className="sub_header md_base">Alle Tore</h2>
                {goalsByGameday.map(([day, items]) => (
                  <ClipRail key={day} label={day ? `${day}. Spieltag` : "Ohne Spieltag"} items={items} />
                ))}
              </section>
            )}
            {highlights.length > 0 && (
              <section className="videos-page__section">
                <ClipRail title="Highlights" items={highlights} />
              </section>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
