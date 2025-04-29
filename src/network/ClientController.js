import ApiService from "./ApiService";

/**
 * ClientController class to interact with the Client API endpoints.
 */
class ClientController {
  constructor() {
    this.apiService = new ApiService();
  }

  /**
   * Fetch the homepage data for a specific league.
   * GET /home/league/:code
   * @param {string} code - League code.
   * @returns {Promise<Object>} Homepage data.
   */
  async fetchHomepageData(code) {
    return this.apiService.get(`webClient/home/league/${code}`);
  }

  /**
   * Fetch the league selection.
   * GET /selection
   * @returns {Promise<Object[]>} List of leagues.
   */
  async fetchLeagueSelection() {
    return this.apiService.get(`webClient/selection`);
  }

  /**
   * Fetch the Livescore Across Leagues.
   * GET /livescore
   * @returns {Promise<Object[]>} List of livescore matches short.
   */
  async livescore() {
    return this.apiService.get(`webClient/livescore`);
  }

  /**
   * Fetch the transfers.
   * GET webClient/transfers
   * @returns {Promise<Object[]>} List of transfers.
   */
  async fetchTransferList() {
    return this.apiService.get(`webClient/transfers`);
  }

  /**
   * Fetch the clubs of a specific league.
   * GET /clubs/league/:code
   * @param {string} code - League code.
   * @returns {Promise<Object[]>} List of clubs.
   */
  async fetchLeagueClubs(code) {
    return this.apiService.get(`webClient/clubs/league/${code}`);
  }

  /**
   * Fetch details of a specific club.
   * GET /clubs/detail/:id
   * @param {string} id - Club ID.
   * @returns {Promise<Object>} Club details.
   */
  async fetchClubDetail(id) {
    return this.apiService.get(`webClient/clubs/detail/${id}`);
  }

  /**
   * Fetch the league table.
   * GET /table/league/:code
   * @param {string} code - League code.
   * @returns {Promise<Object[]>} Table data.
   */
  async fetchTable(code) {
    return this.apiService.get(`webClient/table/league/${code}`);
  }

  /**
   * Fetch news for a specific league.
   * GET /news/league/:code
   * @param {string} code - League code.
   * @returns {Promise<Object[]>} List of news items.
   */
  async fetchLeagueNews(code) {
    return this.apiService.get(`webClient/news/league/${code}`);
  }

  /**
   * Fetch news for the Strafsenat.
   * GET /news/strafsenat?per=250
   * @returns {Promise<Object[]>} List of Strafsenat news items.
   */
  async fetchStrafsenatNews() {
    return this.apiService.get(`/news/strafsenat?per=250`);
  }

  /**
   * Fetch details of a specific news item.
   * GET /news/detail/:id
   * @param {string} id - News item ID.
   * @returns {Promise<Object>} News item details.
   */
  async fetchNewsDetail(id) {
    return this.apiService.get(`webClient/news/detail/${id}`);
  }

  /**
   * Fetch matches for the first season in a league.
   * GET /matches/league/:code
   * @param {string} code - League code.
   * @returns {Promise<Object[]>} List of matches.
   */
  async fetchFirstSeasonMatches(code) {
    return this.apiService.get(`webClient/matches/league/${code}`);
  }

  /**
   * Fetch details of a specific match.
   * GET /match/detail/:id
   * @param {string} id - Match ID.
   * @returns {Promise<Object>} Match details.
   */
  async fetchMatchDetail(id) {
    return this.apiService.get(`webClient/match/detail/${id}`);
  }

  /**
   * Fetch details of a specific player.
   * GET /player/detail/:id
   * @param {string} id - Player ID.
   * @returns {Promise<Object>} Player details.
   */
  async fetchPlayerDetail(id) {
    return this.apiService.get(`webClient/player/detail/${id}`);
  }

  /**
   * Fetch details of a specific player stats.
   * GET /player/detail/:id
   * @param {string} id - Player ID.
   * @returns {Promise<Object>} Player Stats details.
   */
  async fetchPlayerStats(id) {
    return this.apiService.get(`webClient/player/${id}/summary/`);
  }

  /**
   * Fetch the goal leaderboard for a specific league.
   * GET /leaderboard/:id/goal
   * @param {string} id - League ID.
   * @returns {Promise<Object[]>} Goal leaderboard data.
   */
  async fetchGoalLeaderBoard(id) {
    return this.apiService.get(`webClient/leaderboard/${id}/goal`);
  }

  /**
   * Fetch the goal leaderboard yellow Cards for a specific league.
   * GET /leaderboard/:id/yellowCard
   * @param {string} id - League ID.
   * @returns {Promise<Object[]>} YellowCard leaderboard data.
   */
  async fetchYellowCardLeaderBoard(id) {
    return this.apiService.get(`webClient/leaderboard/${id}/yellowCard`);
  }

  /**
   * Fetch the red card leaderboard for a specific league.
   * GET /leaderboard/:id/redCard
   * @param {string} id - League ID.
   * @returns {Promise<Object[]>} Red card leaderboard data.
   */
  async fetchRedCardLeaderBoard(id) {
    return this.apiService.get(`webClient/leaderboard/${id}/redCard`);
  }

  /**
   * Fetch the yellow card leaderboard for a specific league.
   * GET /leaderboard/:id/yellowCard
   * @param {string} id - League ID.
   * @returns {Promise<Object[]>} Yellow card leaderboard data.
   */
  async fetchYellowRedCardLeaderBoard(id) {
    return this.apiService.get(`webClient/leaderboard/${id}/yellowRedCard`);
  }

  /**
   * Fetch blocked players for a specific league.
   * GET /blocked/league/:code
   * @param {string} code - League code.
   * @returns {Promise<Object[]>} List of blocked players.
   */
  async fetchBlockedPlayers(code) {
    return this.apiService.get(`webClient/blocked/league/${code}`);
  }

  /**
   * Fetch A Transfer Request Data.
   * GET /transfers/:id
   * @param {string} id - Transfer ID.
   * @returns {Promise<Object>} Transfer details.
   */
  async fetchTransfer(id) {
    return this.apiService.get(`transfers/${id}`);
  }

  /**
   * Confirm A Transfer Request.
   * GET /transfers/confirm/:id
   * @param {string} id - Transfer ID.
   * @returns {Promise<Object>} Transfer details.
   */
  async confirmTransfer(id) {
    return this.apiService.get(`transfers/confirm/${id}`);
  }

  /**
   * Decline A Transfer Request.
   * GET /transfers/reject/:id
   * @param {string} id - Transfer ID.
   * @returns {Promise<Object>} Transfer details.
   */
  async rejectTransfer(id) {
    return this.apiService.get(`transfers/reject/${id}`);
  }

  /**
   * Register a new user.
   * POST /registrations/register
   *
   * @param {Object} registrationData - Registration data.
   * @param {Object} registrationData.primaryContact - Primary contact information.
   * @param {string} registrationData.primaryContact.first - First name.
   * @param {string} registrationData.primaryContact.last - Last name.
   * @param {string} registrationData.primaryContact.phone - Phone number.
   * @param {string} registrationData.primaryContact.email - Email address.
   * @param {string} registrationData.primaryContact.identification - Identification.
   * @param {Object} registrationData.secondaryContact - Secondary contact information.
   * @param {string} registrationData.secondaryContact.first - First name.
   * @param {string} registrationData.secondaryContact.last - Last name.
   * @param {string} registrationData.secondaryContact.phone - Phone number.
   * @param {string} registrationData.secondaryContact.email - Email address.
   * @param {string} registrationData.secondaryContact.identification - Identification.
   * @param {string} registrationData.teamName - Team name.
   * @param {string} registrationData.verein - Verein.
   * @param {string} registrationData.bundesland - Bundesland.
   * @param {string} registrationData.type - Type (e.g., "privat").
   * @param {boolean} registrationData.acceptedAGB - Whether the AGB terms are accepted.
   * @param {string} registrationData.referCode - Referral code.
   * @param {string} registrationData.initial_password - Initial password.
   *
   * @returns {Promise<Object>} Registration response.
   */
  async register(registrationData) {
    return this.apiService.post(`registrations/register`, registrationData);
  }
}

export default ClientController;
