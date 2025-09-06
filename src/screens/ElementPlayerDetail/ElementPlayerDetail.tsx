// ElementPlayerDetail.tsx
// -----------------------------------------------------------------------------
// Player detail view with a reorganized hero:
//   [ club logo ] [ info/facts ] [ # number + NAME ]
// Player portrait sits to the right, responsive and well placed.
// -----------------------------------------------------------------------------

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Dropdown } from "../../components/Dropdown";
import { FixtureDataCell } from "../../components/FixtureDataCell";
import { Footer } from "../../components/Footer";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { StatCell } from "../../components/StatCell";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";

import "./style.css";

type TeamLite = {
  id?: string;
  team_name?: string;
  logo?: string;
};

type Player = {
  id: string;
  name: string;
  number?: string;
  image?: string;
  nationality?: string;
  birthday?: string;
  eligibility?: string;
  position?: string;
  sid?: string;
  status?: boolean;
  team?: TeamLite;
  stats?: Record<string, number>;
};

type Match = {
  id?: string;
  details?: {
    date?: string;
    gameday?: number;
    location?: string;
    [k: string]: any;
  };
  [k: string]: any;
};

type SeasonWithMatches = {
  league_name: string;
  league_id: string;
  season_id: string;
  season_name: string;
  primary?: boolean;
  matches?: Match[];
};

type PlayerDetailResponse = {
  player: Player;
  upcoming: SeasonWithMatches[];
};

// ----- Utils -----------------------------------------------------------------

const splitAndCapitalizeName = (name: string) => {
  const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s);
  const [firstName, ...rest] = (name ?? "").trim().split(/\s+/);
  return {
    firstName: cap(firstName ?? ""),
    lastName: rest.map(cap).join(" "),
  };
};

const formatNationality = (nationality: string): string =>
  (nationality ?? "")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, "")
    .replace(/[^a-z]/g, "");

const toMs = (iso?: string) => (iso ? new Date(iso).getTime() : NaN);

const formatDateDMY = (iso?: string) => {
  const ms = toMs(iso);
  if (Number.isNaN(ms)) return "";
  const d = new Date(ms);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

// ----- Constants -------------------------------------------------------------

const ALL_SEASONS = "__ALL__";
const ALL_GAMEDAYS = -1;

// ----- Component -------------------------------------------------------------

export const ElementPlayerDetail = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const { id } = useParams();
  const navigate = useNavigate();

  const clientController = useMemo(() => new ClientController(), []);
  const authService = useMemo(() => new AuthService(), []);

  // Core state
  const [player, setPlayer] = useState<Player | null>(null);
  const [seasons, setSeasons] = useState<SeasonWithMatches[]>([]);
  const [loading, setLoading] = useState(true);

  // Derived display state
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [nationalityCode, setNationalityCode] = useState("");

  // Filters
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
  const [uniqueGamedays, setUniqueGamedays] = useState<{ gameday: number; date: string }[]>([]);
  const [selectedGameday, setSelectedGameday] = useState<number>(ALL_GAMEDAYS);

  // ---- Fetch ----
  useEffect(() => {
    const fetchPlayerDetail = async () => {
      const leagueCode = authService.getLeagueCode();
      if (!leagueCode) {
        console.error("No league code found in cookies.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = (await clientController.fetchPlayerDetail(id)) as PlayerDetailResponse;

        setPlayer(response?.player ?? null);
        const upcoming = Array.isArray(response?.upcoming) ? response.upcoming : [];
        setSeasons(upcoming);

        const primary =
          upcoming.find((s) => s.primary) ??
          upcoming.find((s) => (s.matches?.length ?? 0) > 0) ??
          upcoming[0] ??
          null;
        setSelectedSeasonId(primary?.season_id ?? ALL_SEASONS);

        if (response?.player?.name) {
          const { firstName, lastName } = splitAndCapitalizeName(response.player.name);
          setFirst(firstName);
          setLast(lastName);
        }
        setNationalityCode(formatNationality(response?.player?.nationality ?? ""));
      } catch (err) {
        console.error("Error fetching player detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerDetail();
  }, [id, authService, clientController]);

  // ---- Build gameday options whenever selected season changes ---------------
  useEffect(() => {
    if (!seasons.length) {
      setUniqueGamedays([{ gameday: ALL_GAMEDAYS, date: "Alle Spieltage" }]);
      setSelectedGameday(ALL_GAMEDAYS);
      return;
    }

    const useAll = !selectedSeasonId || selectedSeasonId === ALL_SEASONS;
    const pool = useAll ? seasons : seasons.filter((s) => s.season_id === selectedSeasonId);
    const matches = pool.flatMap((s) => s.matches ?? []);

    const map = new Map<number, string>();
    matches.forEach((m) => {
      const gd = m?.details?.gameday;
      const dateStr = m?.details?.date;
      if (!gd || !dateStr) return;

      const cur = toMs(dateStr);
      if (Number.isNaN(cur)) return;

      const existing = map.get(gd);
      if (!existing) {
        map.set(gd, formatDateDMY(dateStr));
      } else {
        const [dd, mm, yyyy] = existing.split(".");
        const prev = new Date(`${yyyy}-${mm}-${dd}T00:00:00Z`).getTime();
        if (cur < prev) map.set(gd, formatDateDMY(dateStr));
      }
    });

    const list = Array.from(map.entries())
      .map(([gameday, date]) => ({ gameday, date }))
      .sort((a, b) => a.gameday - b.gameday);

    setUniqueGamedays([{ gameday: ALL_GAMEDAYS, date: "Alle Spieltage" }, ...list]);

    const today = Date.now();
    let closest = ALL_GAMEDAYS;
    let min = Infinity;
    matches.forEach((m) => {
      const iso = m?.details?.date;
      const gd = m?.details?.gameday;
      const ms = toMs(iso);
      if (!gd || Number.isNaN(ms)) return;
      const diff = Math.abs(today - ms);
      if (diff < min) {
        min = diff;
        closest = gd;
      }
    });

    setSelectedGameday(list.length ? closest : ALL_GAMEDAYS);
  }, [selectedSeasonId, seasons]);

  // ---- Derived: stats, selections, fixtures --------------------------------
  const playerStats = player?.stats ? Object.entries(player.stats) : [];

  const usingAllSeasons = !selectedSeasonId || selectedSeasonId === ALL_SEASONS;
  const selectedSeason = seasons.find((s) => s.season_id === selectedSeasonId) ?? null;

  const baseMatches: Match[] = usingAllSeasons
    ? seasons.flatMap((s) => s.matches ?? [])
    : selectedSeason?.matches ?? [];

  const fixtures = baseMatches
    .filter((m) =>
      selectedGameday === ALL_GAMEDAYS ? true : m?.details?.gameday === selectedGameday
    )
    .slice()
    .sort((a, b) => {
      const da = toMs(a?.details?.date);
      const db = toMs(b?.details?.date);
      if (!Number.isNaN(da) && !Number.isNaN(db) && da !== db) return da - db;
      const ga = Number(a?.details?.gameday ?? 0);
      const gb = Number(b?.details?.gameday ?? 0);
      return ga - gb;
    });

  if (loading) return <LoadingIndicator />;

  return (
    <div className="element-player-detail">
      {isMobile ? <Navigation /> : <DesktopNav />}

      {/* HERO */}
      <header className="player-hero">
        <div className="player-hero__inner">
          {/* 3-column row : logo | info | number+name */}
          <div className="player-hero__row">
            <div className="player-hero__logoCell">
              {player?.team?.logo && (
                <img className="player-hero__logo" src={player.team.logo} alt="" />
              )}
            </div>

            <div className="player-hero__nameCell">
              <span className="player-hero__number">{player?.number ?? "0"}</span>
              <div className="player-hero__nameBlock">
                <span className="player-hero__first">{first}</span>
                <span className="player-hero__last">{last}</span>
              </div>
            </div>


            <dl className="player-hero__facts">
              <div className="fact">
                <dt className="p fact__k">Mannschaft</dt>
                <dd
                  className="p fact__v fact__v--link"
                  onClick={() => player?.team?.id && navigate(`/team-detail/${player.team.id}`)}
                >
                  {player?.team?.team_name ?? "Unknown"}
                </dd>
              </div>

              <div className="p fact">
                <dt className="fact__k">SID</dt>
                <dd className="fact__v">{player?.sid ?? "Unknown"}</dd>
              </div>
              <div className="p fact">
                <dt className="fact__k">Position</dt>
                <dd className="fact__v">{player?.position ?? "Unknown"}</dd>
              </div>
              <div className="p fact">
                <dt className="fact__k">Status</dt>
                <dd className="fact__v">{player?.eligibility ?? "Unknown"}</dd>
              </div>
              <div className="p fact">
                <dt className="fact__k">Jahrgang</dt>
                <dd className="fact__v">{player?.birthday ?? "Unknown"}</dd>
              </div>
              <div className="p fact fact--flag">
                <dt className="fact__k">Nationalität</dt>
                <dd className="fact__v">
                  {nationalityCode && (
                    <img
                      src={`https://www.zeitzonen.de/build/images/flags/${nationalityCode}.svg`}
                      className="flagicon"
                      alt=""
                    />
                  )}
                  {player?.nationality ?? "Unknown"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Portrait anchored right */}
          <div className="player-hero__portrait">
            {player?.image && (
              <img className="player-hero__img" src={player.image} alt="Player" />
            )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="page-content">
        <section style={{ width: "-webkit-fill-available" }}>
          <h2 className="sub_header md_base">{player?.name ?? "Player"} Ewige Statistik</h2>
          <div className="h3 stats-grid md_base" style={{ justifyItems: "center" }}>
            {playerStats.map(([k, v]) => (
              <StatCell key={k} statKey={k} statValue={v} />
            ))}
          </div>
        </section>

        <section style={{ width: "-webkit-fill-available" }}>
          <h2 className="sub_header md_base">{player?.name ?? "Player"} Saison Statistik</h2>
          <div className="h3 stats-grid md_base" style={{ justifyItems: "center" }}>
            {playerStats.map(([k, v]) => (
              <StatCell key={`season-${k}`} statKey={k} statValue={v} />
            ))}
          </div>
        </section>

        <section style={{ width: "-webkit-fill-available" }}>
          <h2 className="sub_header md_base">
            Spiele &amp; Ergebnisse{" "}
            {!selectedSeasonId || selectedSeasonId === ALL_SEASONS
              ? "– Alle Saisonen"
              : selectedSeason
              ? `– ${selectedSeason.season_name}`
              : ""}
            {selectedGameday !== ALL_GAMEDAYS ? ` · Spieltag ${selectedGameday}` : ""}
          </h2>

          <div className="gameday__filters" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
            <Dropdown
              className="gameday__filter"
              text="Saison"
              placeholder="Saison Auswahl"
              options={[
                { id: ALL_SEASONS, value: ALL_SEASONS, label: "Alle Saisonen (Alle Spiele)" },
                ...seasons.map((s) => ({
                  id: s.season_id,
                  value: s.season_id,
                  label: `${s.season_name}${s.primary ? " ★" : ""}`,
                })),
              ]}
              displayKey="label"
              valueKey="value"
              onChange={(val) => setSelectedSeasonId(val)}
              value={selectedSeasonId ?? ALL_SEASONS}
            />

            <Dropdown
              className="gameday__filter"
              text="Spieltag"
              placeholder="Spieltag Auswahl"
              options={uniqueGamedays.map(({ gameday, date }) => ({
                id: gameday,
                value: gameday,
                label: gameday === ALL_GAMEDAYS ? "Alle Spieltage" : `Spieltag ${gameday} – ${date}`,
              }))}
              displayKey="label"
              valueKey="value"
              onChange={(val) => setSelectedGameday(Number(val))}
              value={selectedGameday}
            />
          </div>

          <div style={{ width: "100%" }}>
            {fixtures.length === 0 ? (
              <div>Keine Spiele vorhanden.</div>
            ) : (
              fixtures.map((match, idx) => {
                const key =
                  match?.id ??
                  `${match?.details?.date ?? ""}-${match?.home_blanket?.id ?? ""}-${match?.away_blanket?.id ?? ""}-${idx}`;
                return (
                  <FixtureDataCell
                    key={key}
                    match={match}
                    state={screenWidth < 600 ? "mobile" : "desktop"}
                  />
                );
              })
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ElementPlayerDetail;
