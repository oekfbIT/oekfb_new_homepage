# OEKFB Homepage Web App Handoff

## 1. Application Summary

This project is the public homepage and web client for the Oesterreichischer Kleinfeld Fussball Bund, a small-sided soccer organization. The app is not just a marketing homepage. It acts as a public league portal for fans, players, teams, and organizers.

The app lets users:

- Select a league and store the active league in cookies.
- View a league homepage with news, highlights, sponsor/media content, standings, and match information.
- Browse teams in a league.
- Open team detail pages with squad, team statistics, season statistics, and matches.
- Open player detail pages with profile data, career statistics, season statistics, and match history.
- View league tables and standings.
- View fixture schedules and matchdays.
- View live scores across leagues.
- Open match reports with teams, score, match events, and related stats.
- Read news and match reports.
- Read Strafsenat disciplinary news/decisions.
- View player leaderboards for goals and card statistics.
- View suspended/blocked players.
- View transfer lists and transfer action pages.
- Approve or deny match postponement requests from special links.
- Register a new team.
- Register people for an event, currently Gala Night.
- Verify a user email token from a special app verification URL.
- Read static information pages such as contact, impressum, privacy, rules, league order, and federation/about content.

The current frontend is a React app using `react-router-dom` with `HashRouter`, so routes look like `/#/liga`, `/#/teams`, etc. The current backend base URL is `https://api.oekfb.eu`.

The core goal for the rebuild is to keep the same product behavior and data structure, but modernize the visual design. The new version should feel like a polished sports league platform: clean, data-rich, mobile-friendly, professional, and easier to maintain.

## 2. Frontend Screens And Routes

| Screen | Route | Current Component | Purpose |
|---|---|---|---|
| League selection | `#/` | `ElementLeagueSelection` | Start page for selecting a league and showing global highlights/news. |
| League homepage | `#/liga` | `Homepage` | Main homepage for the selected league. |
| App promo page | `#/app` | `AppPage` | Public page promoting the OEKFB app. |
| Gala Night registration | `#/gala-night` | `EventRegistration` | Public event signup form. |
| User verification | `#/app/user/verify/:id` | `VerifyPage` | Email/user verification status page. |
| Mobile navigation | `#/mobilenav` | `ElementMobilenav` | Standalone mobile menu/drawer content. |
| Match report | `#/match/:id` | `ElementGameReport` | Match detail/report page. |
| Schedule | `#/spielplan` | `ElementGamedayMobile` | Fixtures and matchdays. |
| Livescore | `#/livescore` | `ElementLivescore` | Live scores across leagues. |
| Team detail | `#/team-detail/:id` | `ElementTeamDetail` | Team profile, stats, squad, matches. |
| Player detail | `#/player-detail/:id` | `ElementPlayerDetail` | Player profile and stats. |
| News list | `#/news` | `ElementNewsMobile` | League news and match reports. |
| Strafsenat | `#/strafsenat` | `Strafsenat` | Disciplinary decisions/news. |
| Leaderboards | `#/leaderboards` | `ElementLeaderboard` | Goals and cards leaderboards. |
| Contact | `#/kontakt` | `ElementContactMobile` | Contact information. |
| Impressum | `#/impressum` | `ElementImpressiumMobile` | Legal imprint. |
| Privacy | `#/privacy` | `ElementPrivacy` | Privacy policy. |
| Suspensions | `#/sperren` | `ElementSperrenDesktop` | Suspended/blocked players. |
| Transfers | `#/transfers` | `ElementTransfersDesktop` | Transfer list. |
| Transfer action | `#/transfer/:id` | `ElementTransfer` | Confirm/reject transfer flow. |
| Postponement action | `#/postpone/:id` | `ElementPostpone` | Approve/deny match postponement flow. |
| Team registration | `#/register` | `ElementRegister` | New team registration form. |
| League order | `#/ligaordnung` | `ElementLigaordnung` | Static league order/rules content. |
| Game rules | `#/spielregeln` | `ElementRegeln` | Static game rules content. |
| Federation/about | `#/bund` | `ElementBund` | About the federation and small-sided football. |
| Teams | `#/teams` | `ElementClubsDesktop` | Teams/clubs in selected league. |
| Table | `#/tabelle` | `ElementTableMobile` | League standings. |
| Registration upload | `#/team/upload/:id` | `UploadRequest` | Registration document upload. Currently mostly commented. |
| News detail | `#/news-detail/:id` | `ElementNewsDetail` | Single news article or match report. |
| Fallback | `#/*` | `ElementLeagueSelection` | Unknown routes redirect to league selection behavior. |

## 3. API Base URL And Client Behavior

Current API base:

```txt
https://api.oekfb.eu
```

Test/local URLs referenced in the existing code:

```txt
https://test.oekfb.eu
http://localhost:8080
```

Current client behavior:

- Sends JSON requests with `Content-Type: application/json` and `Accept: application/json`.
- Uses `credentials: include`.
- Uses cookies for selected league and auth-related data:
  - `leagueCode`
  - `leagueID`
  - `authToken`
  - `adminID`
- Stores selected league locally by cookie, then routes to `#/liga`.
- Uses `leagueCode` for most league-scoped requests.
- Uses entity IDs for detail pages.

## 4. API Routes Used By The Frontend

### League Discovery

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/webClient/selection` | League selection/start page. |
| `GET` | `/client/leagueList?per=25` | League pills in desktop/mobile navigation. |
| `GET` | `/leagues/code/{code}` | Get league metadata by code. |
| `GET` | `/leagues/{id}` | Get league metadata by ID. |

### Homepage

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/webClient/home/league/{code}` | Main homepage data for selected league. |

### Clubs And Teams

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/webClient/clubs/league/{code}` | Team list for selected league. |
| `GET` | `/webClient/clubs/detail/{id}` | Team detail, squad, stats, matches. |

### Tables And Standings

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/webClient/table/league/{code}` | League standings page. |
| `GET` | `/webClient/leagues/{code}/current/table` | Current-season standings used by homepage/table widgets. |

### Matches, Fixtures, And Livescore

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/webClient/livescore` | Livescore page. |
| `GET` | `/webClient/matches/league/{code}` | First season matches. |
| `GET` | `/webClient/matches/league/{code}/primary` | Primary season matches. |
| `GET` | `/webClient/matches/league/{code}/index` | All season/matchday grouped fixtures. |
| `GET` | `/webClient/match/detail/{id}` | Match report/detail page. |

### Players And Stats

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/webClient/player/detail/{id}` | Player detail page. |
| `GET` | `/webClient/player/{id}/summary/` | Player career/season summary stats. |

### Leaderboards

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/webClient/leaderboard/{id}/goal` | Goal scorer leaderboard. |
| `GET` | `/webClient/leaderboard/{id}/yellowCard` | Yellow card leaderboard. |
| `GET` | `/webClient/leaderboard/{id}/redCard` | Red card leaderboard. |
| `GET` | `/webClient/leaderboard/{id}/yellowRedCard` | Yellow-red card leaderboard. |

Note: The existing code passes the selected league code into these leaderboard methods, although comments call it league ID. The rebuild should support whichever value the backend expects.

### News And Strafsenat

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/webClient/news/league/{code}` | League news list. |
| `GET` | `/webClient/news/detail/{id}` | News article/detail page. |
| `GET` | `/news/strafsenat?per=250` | Strafsenat decisions/news page. |

### Discipline

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/webClient/blocked/league/{code}` | Suspended/blocked players page. |

### Transfers

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/webClient/transfers` | Public transfer list. |
| `GET` | `/transfers/{id}` | Transfer detail/action page. |
| `GET` | `/transfers/confirm/{id}` | Confirm a transfer request. |
| `GET` | `/transfers/reject/{id}` | Reject a transfer request. |

### Match Postponements

| Method | Endpoint | Used For |
|---|---|---|
| `GET` | `/postpone/{id}/id` | Postponement request detail. |
| `POST` | `/postpone/{id}/approve` | Approve postponement. |
| `POST` | `/postpone/{id}/deny` | Deny postponement. |

### Registrations

| Method | Endpoint | Used For |
|---|---|---|
| `POST` | `/registrations/register` | New team registration. |
| `GET` | `/registrations/{id}` | Registration upload page, currently commented/intended. |
| `PATCH` | `/registrations/{id}` | Update uploaded registration document URLs, currently commented/intended. |

### Events

| Method | Endpoint | Used For |
|---|---|---|
| `POST` | `/people-events/{id}/register` | Gala Night/event registration. |

Current hardcoded event ID:

```txt
3809BD4F-D26A-4C12-9C81-3E674531AF79
```

### Auth And Verification

| Method | Endpoint | Used For |
|---|---|---|
| `POST` | `/users/login` | Login via Basic Auth. Mostly service code; public homepage links to external team portal. |
| `GET` | `/app/application/user/verify/{token}` | Verify user email token. |

## 5. Main Entities / Models

These are inferred from the frontend and should be treated as flexible models. The backend may include additional fields.

### League

```ts
type League = {
  id: string;
  _id?: string;
  code: string;
  name?: string;
  title?: string;
  location?: string;
  logo?: string;
};
```

### Club / Team

```ts
type Club = {
  id: string;
  _id?: string;
  name: string;
  logo?: string;
  image?: string;
  league?: League;
};
```

### Club Detail

```ts
type ClubDetail = Club & {
  squad?: Player[];
  stats?: TeamStats;
  seasonStats?: TeamStats;
  matches?: Match[];
};
```

### Player

```ts
type Player = {
  id: string;
  _id?: string;
  name?: string;
  first?: string;
  last?: string;
  number?: string | number;
  position?: string;
  profileImage?: string;
  club?: Club;
};
```

### Player Detail

```ts
type PlayerDetail = Player & {
  stats?: PlayerStats;
  seasonStats?: PlayerStats;
  matches?: Match[];
};
```

### Team Stats

```ts
type TeamStats = {
  games?: number;
  wins?: number;
  draws?: number;
  losses?: number;
  goals?: number;
  goalsAgainst?: number;
  points?: number;
};
```

### Player Stats

```ts
type PlayerStats = {
  appearances?: number;
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
  yellowRedCards?: number;
};
```

### Table Row

```ts
type TableRow = {
  position?: number;
  club?: Club;
  clubName?: string;
  games?: number;
  wins?: number;
  draws?: number;
  losses?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: number;
  points?: number;
};
```

### Match

```ts
type Match = {
  id: string;
  _id?: string;
  date?: string;
  status?: string;
  league?: League;
  home?: Club;
  away?: Club;
  home_blanket?: Club;
  away_blanket?: Club;
  homeScore?: number;
  awayScore?: number;
  venue?: string;
};
```

### Match Detail

```ts
type MatchDetail = Match & {
  events?: MatchEvent[];
  lineups?: Record<string, unknown>;
  report?: string;
  videoUrl?: string;
};

type MatchEvent = {
  id?: string;
  type?: "goal" | "yellowCard" | "redCard" | "yellowRedCard" | "substitution" | string;
  minute?: number;
  player?: Player;
  team?: Club;
  description?: string;
};
```

### Season Matches

```ts
type SeasonMatches = {
  id?: string;
  name?: string;
  season?: string;
  matchdays?: {
    id?: string;
    gameDay?: string;
    date?: string;
    matches?: Match[];
  }[];
};
```

### News Item

```ts
type NewsItem = {
  id: string;
  _id?: string;
  title: string;
  subtitle?: string;
  teaser?: string;
  image?: string;
  createdAt?: string;
  date?: string;
};
```

### News Detail

```ts
type NewsDetail = NewsItem & {
  body?: string;
  content?: string;
  video?: string;
  league?: League;
};
```

### Leaderboard Entry

```ts
type LeaderboardEntry = {
  player?: Player;
  playerId?: string;
  name?: string;
  club?: Club;
  count: number;
};
```

### Blocked / Suspended Player

```ts
type BlockedPlayer = {
  player?: Player;
  playerId?: string;
  name?: string;
  club?: Club;
  reason?: string;
  until?: string;
  gamesRemaining?: number;
};
```

### Transfer

```ts
type Transfer = {
  id: string;
  _id?: string;
  player?: Player;
  fromClub?: Club;
  toClub?: Club;
  status?: "open" | "confirmed" | "rejected" | "completed" | "cancelled" | string;
  createdAt?: string;
};
```

### Postponement Request

```ts
type PostponeRequest = {
  id: string;
  match?: Match;
  requestedBy?: Club;
  reason?: string;
  status?: "open" | "approved" | "denied" | string;
  createdAt?: string;
};
```

### Team Registration Request

```ts
type TeamRegistrationRequest = {
  primaryContact: RegistrationContact;
  secondaryContact: RegistrationContact;
  teamName: string;
  verein?: string;
  bundesland: string;
  type: string;
  acceptedAGB: boolean;
  referCode?: string;
  initial_password?: string;
};

type RegistrationContact = {
  first?: string;
  last?: string;
  phone?: string;
  email?: string;
  identification?: string;
};
```

### Team Registration

```ts
type TeamRegistration = {
  id: string;
  _id?: string;
  teamName?: string;
  status?: string;
  primary?: RegistrationContact;
  secondary?: RegistrationContact;
  teamLogo?: string;
  customerSignedContract?: string;
};
```

### People Event Registration

```ts
type PeopleEventRegistrationRequest = {
  name: string;
  team?: string;
  email?: string;
  phone?: string;
  numberOfPeople: number;
  status: "open" | string;
  notes?: string;
};
```

### Login Response

```ts
type LoginResponse = {
  token: string;
  user: {
    id: string;
    email?: string;
    name?: string;
    [key: string]: unknown;
  };
};
```

## 6. Static Content Pages

These pages do not appear to require backend API calls in the current frontend:

- `#/kontakt` - Contact.
- `#/impressum` - Impressum.
- `#/privacy` - Privacy policy.
- `#/ligaordnung` - League order, likely sourced from local `src/data/ligaordnung.json`.
- `#/spielregeln` - Game rules, likely sourced from local `src/data/regeln.json`.
- `#/bund` - Federation/about content, likely sourced from local `src/data/bund.json`.
- `#/app` - App promotion page.

## 7. Base44 Build Prompt

Copy this prompt into Base44:

```txt
Build a modern replacement for the OEKFB public homepage and league web app.

Context:
OEKFB is a small-sided soccer organization. This is not only a marketing homepage. It is a public league portal for fans, players, teams, and organizers. The app must help users select a league, view professional league statistics, browse teams and players, see schedules, standings, live scores, match reports, news, leaderboards, suspensions, transfers, registrations, and event signups.

Primary goal:
Recreate the current app behavior and routes, but modernize the design. The UI should feel like a professional sports league platform: clean, fast, mobile-first, data-rich, readable, and trustworthy. Keep the structure maintainable and component-based.

Tech behavior:
- Use the API base URL https://api.oekfb.eu.
- The existing app uses hash routes like /#/liga. Preserve route names if possible.
- Send JSON requests with Content-Type: application/json and Accept: application/json.
- Include credentials on API calls.
- Store selected leagueCode and leagueID in cookies or a persistent client store.
- Most league-scoped screens depend on the active league code.
- Treat backend response shapes as flexible because some fields are inferred.

Required routes/screens:
- #/ - League selection/start page.
- #/liga - Selected league homepage.
- #/teams - Team list.
- #/team-detail/:id - Team detail with squad, stats, and matches.
- #/player-detail/:id - Player detail with career and season stats.
- #/tabelle - League table/standings.
- #/spielplan - Fixtures and matchdays.
- #/match/:id - Match report/detail.
- #/livescore - Livescore.
- #/leaderboards - Goals/cards leaderboards.
- #/news - League news list.
- #/news-detail/:id - News detail.
- #/strafsenat - Disciplinary decisions/news.
- #/sperren - Suspended/blocked players.
- #/transfers - Transfer list.
- #/transfer/:id - Transfer action/detail.
- #/postpone/:id - Postponement approval/denial page.
- #/register - New team registration form.
- #/team/upload/:id - Registration document upload/update page.
- #/gala-night - Event registration form.
- #/app/user/verify/:id - Email/user verification page.
- #/kontakt - Contact page.
- #/impressum - Legal imprint.
- #/privacy - Privacy policy.
- #/ligaordnung - League order/rules.
- #/spielregeln - Game rules.
- #/bund - Federation/about page.
- #/app - App promotion page.

Required API calls:
- GET /webClient/selection
- GET /client/leagueList?per=25
- GET /leagues/code/{code}
- GET /leagues/{id}
- GET /webClient/home/league/{code}
- GET /webClient/clubs/league/{code}
- GET /webClient/clubs/detail/{id}
- GET /webClient/table/league/{code}
- GET /webClient/leagues/{code}/current/table
- GET /webClient/livescore
- GET /webClient/matches/league/{code}
- GET /webClient/matches/league/{code}/primary
- GET /webClient/matches/league/{code}/index
- GET /webClient/match/detail/{id}
- GET /webClient/player/detail/{id}
- GET /webClient/player/{id}/summary/
- GET /webClient/leaderboard/{id}/goal
- GET /webClient/leaderboard/{id}/yellowCard
- GET /webClient/leaderboard/{id}/redCard
- GET /webClient/leaderboard/{id}/yellowRedCard
- GET /webClient/news/league/{code}
- GET /webClient/news/detail/{id}
- GET /news/strafsenat?per=250
- GET /webClient/blocked/league/{code}
- GET /webClient/transfers
- GET /transfers/{id}
- GET /transfers/confirm/{id}
- GET /transfers/reject/{id}
- GET /postpone/{id}/id
- POST /postpone/{id}/approve
- POST /postpone/{id}/deny
- POST /registrations/register
- GET /registrations/{id}
- PATCH /registrations/{id}
- POST /people-events/{id}/register
- POST /users/login
- GET /app/application/user/verify/{token}

Important data models:
Use flexible TypeScript-like models for League, Club, ClubDetail, Player, PlayerDetail, TeamStats, PlayerStats, TableRow, Match, MatchDetail, SeasonMatches, NewsItem, NewsDetail, LeaderboardEntry, BlockedPlayer, Transfer, PostponeRequest, TeamRegistrationRequest, TeamRegistration, PeopleEventRegistrationRequest, and LoginResponse.

Design direction:
- Use a strong sports dashboard style, not a generic landing page.
- Prioritize tables, fixtures, score cards, stat cards, ranking rows, team/player profiles, and fast navigation.
- Make mobile screens excellent because many users will check scores and schedules from phones.
- Navigation should expose league switching, teams, table, schedule, livescore, leaderboards, news, transfers, and registration.
- Homepage should immediately show selected league identity, upcoming/live matches, standings preview, top stories, and key actions.
- Team detail should show logo/name, stats, squad list, fixtures/results.
- Player detail should show player identity, team, number, stats, season/career sections.
- Match report should clearly show teams, score, status/date, events, and report/media.
- Use loading, empty, and error states for every API screen.
- Do not require exact old styling. Keep the product behavior and data routes, but improve the visual system.

Deliverable:
Generate the application with reusable API client functions, route-level screens, shared layout/navigation, typed data models where possible, and polished responsive components. Mock gracefully when data fields are missing, but wire every screen to the API endpoints listed above.
```
