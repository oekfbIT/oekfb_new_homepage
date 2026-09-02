import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { ClubCard } from "../../components/ClubCard";
import { Footer } from "../../components/Footer";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Navigation } from "../../components/Navigation";
import { TeamDetailSquad } from "../../components/TeamDetailSquad";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";
import "./style.css";

type SearchTeam = {
  id: string;
  sid: string;
  logo: string;
  team_name: string;
  league_id?: string;
  league_code?: string;
  league_name?: string;
};

type SearchPlayer = {
  id: string;
  sid: string;
  image: string;
  name: string;
  number?: string | number;
  birthday?: string;
  nationality: string;
  eligibility: string;
  team_id?: string;
  team_name?: string;
  team_logo?: string;
  league_id?: string;
  league_code?: string;
  league_name?: string;
};

type SearchResponse = {
  teams?: SearchTeam[];
  players?: SearchPlayer[];
  teams_count?: number;
  players_count?: number;
};

export const SearchResults = (): JSX.Element => {
  const isMobile = useWindowWidth() < 900;
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const clientController = useMemo(() => new ClientController(), []);

  const [results, setResults] = useState<SearchResponse>({ teams: [], players: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    if (!query) {
      setResults({ teams: [], players: [] });
      setLoading(false);
      setError(false);
      return () => { isCurrent = false; };
    }

    const loadResults = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await clientController.fetchSearchResults(query);
        if (isCurrent) setResults(response ?? { teams: [], players: [] });
      } catch (requestError) {
        console.error("Search failed:", requestError);
        if (isCurrent) {
          setResults({ teams: [], players: [] });
          setError(true);
        }
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    loadResults();
    return () => { isCurrent = false; };
  }, [clientController, query]);

  const teams = Array.isArray(results.teams) ? results.teams : [];
  const players = Array.isArray(results.players) ? results.players : [];
  const hasResults = teams.length > 0 || players.length > 0;

  return (
    <div className="search-page">
      {isMobile ? <Navigation /> : <DesktopNav />}

      <main className="search-page__main">
        <header className="search-page__header">
          <h1>Suchergebnisse</h1>
          {query && <p>Ergebnisse für „{query}“</p>}
        </header>

        {!query ? (
          <p className="search-page__message">Bitte gib einen Spieler- oder Teamnamen ein.</p>
        ) : loading ? (
          <div className="search-page__loading"><LoadingIndicator /></div>
        ) : error ? (
          <p className="search-page__message search-page__message--error">
            Die Suche konnte nicht geladen werden. Bitte versuche es erneut.
          </p>
        ) : !hasResults ? (
          <p className="search-page__message">Keine Spieler oder Teams gefunden.</p>
        ) : (
          <div className="search-page__results">
            {teams.length > 0 && <section className="search-section" aria-labelledby="team-results-heading">
              <div className="search-section__heading">
                <h2 id="team-results-heading">Teams</h2>
                <span>{results.teams_count ?? teams.length}</span>
              </div>
              <div className="search-grid search-grid--teams">
                {teams.map((team) => <ClubCard key={team.id} club={team} />)}
              </div>
            </section>}

            {players.length > 0 && <section className="search-section" aria-labelledby="player-results-heading">
              <div className="search-section__heading">
                <h2 id="player-results-heading">Spieler</h2>
                <span>{results.players_count ?? players.length}</span>
              </div>
              <div className="search-grid search-grid--players">
                {players.map((player) => (
                  <TeamDetailSquad
                    key={player.id}
                    className="search-result-player"
                    player={{
                      ...player,
                      teamId: player.team_id,
                      teamName: player.team_name,
                      teamLogo: player.team_logo,
                      leagueId: player.league_id,
                      leagueCode: player.league_code,
                      leagueName: player.league_name,
                    }}
                  />
                ))}
              </div>
            </section>}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
