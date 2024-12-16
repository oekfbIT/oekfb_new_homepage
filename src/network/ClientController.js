import ApiService from './ApiService';

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
        return this.apiService.get(`home/league/${code}`);
    }

    /**
     * Fetch the league selection.
     * GET /selection
     * @returns {Promise<Object[]>} List of leagues.
     */
    async fetchLeagueSelection() {
        return this.apiService.get(`selection`);
    }

    /**
     * Fetch the clubs of a specific league.
     * GET /clubs/league/:code
     * @param {string} code - League code.
     * @returns {Promise<Object[]>} List of clubs.
     */
    async fetchLeagueClubs(code) {
        return this.apiService.get(`clubs/league/${code}`);
    }

    /**
     * Fetch details of a specific club.
     * GET /clubs/detail/:id
     * @param {string} id - Club ID.
     * @returns {Promise<Object>} Club details.
     */
    async fetchClubDetail(id) {
        return this.apiService.get(`clubs/detail/${id}`);
    }

    /**
     * Fetch the league table.
     * GET /table/league/:code
     * @param {string} code - League code.
     * @returns {Promise<Object[]>} Table data.
     */
    async fetchTable(code) {
        return this.apiService.get(`table/league/${code}`);
    }

    /**
     * Fetch news for a specific league.
     * GET /news/league/:code
     * @param {string} code - League code.
     * @returns {Promise<Object[]>} List of news items.
     */
    async fetchLeagueNews(code) {
        return this.apiService.get(`news/league/${code}`);
    }

    /**
     * Fetch details of a specific news item.
     * GET /news/detail/:id
     * @param {string} id - News item ID.
     * @returns {Promise<Object>} News item details.
     */
    async fetchNewsDetail(id) {
        return this.apiService.get(`news/detail/${id}`);
    }

    /**
     * Fetch matches for the first season in a league.
     * GET /matches/league/:code
     * @param {string} code - League code.
     * @returns {Promise<Object[]>} List of matches.
     */
    async fetchFirstSeasonMatches(code) {
        return this.apiService.get(`matches/league/${code}`);
    }

    /**
     * Fetch details of a specific match.
     * GET /match/detail/:id
     * @param {string} id - Match ID.
     * @returns {Promise<Object>} Match details.
     */
    async fetchMatchDetail(id) {
        return this.apiService.get(`match/detail/${id}`);
    }

    /**
     * Fetch details of a specific player.
     * GET /player/detail/:id
     * @param {string} id - Player ID.
     * @returns {Promise<Object>} Player details.
     */
    async fetchPlayerDetail(id) {
        return this.apiService.get(`player/detail/${id}`);
    }

    /**
     * Fetch the goal leaderboard for a specific league.
     * GET /leaderboard/:id/goal
     * @param {string} id - League ID.
     * @returns {Promise<Object[]>} Goal leaderboard data.
     */
    async fetchGoalLeaderBoard(id) {
        return this.apiService.get(`leaderboard/${id}/goal`);
    }

    /**
     * Fetch the red card leaderboard for a specific league.
     * GET /leaderboard/:id/redCard
     * @param {string} id - League ID.
     * @returns {Promise<Object[]>} Red card leaderboard data.
     */
    async fetchRedCardLeaderBoard(id) {
        return this.apiService.get(`leaderboard/${id}/redCard`);
    }

    /**
     * Fetch the yellow card leaderboard for a specific league.
     * GET /leaderboard/:id/yellowCard
     * @param {string} id - League ID.
     * @returns {Promise<Object[]>} Yellow card leaderboard data.
     */
    async fetchYellowCardLeaderBoard(id) {
        return this.apiService.get(`leaderboard/${id}/yellowCard`);
    }

    /**
     * Fetch blocked players for a specific league.
     * GET /blocked/league/:code
     * @param {string} code - League code.
     * @returns {Promise<Object[]>} List of blocked players.
     */
    async fetchBlockedPlayers(code) {
        return this.apiService.get(`blocked/league/${code}`);
    }
}

export default ClientController;
