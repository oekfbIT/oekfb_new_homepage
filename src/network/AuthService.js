class AuthService {
    constructor() {
        this.baseURL = 'https://api.oekfb.eu/';
        // this.baseURL = "http://localhost:8080"; // Uncomment for local development
    }

    /**
     * Log in a user with the given email and password.
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     * @returns {Object} - An object indicating success or failure and any relevant data.
     */
    async login(email, password) {
        const url = `${this.baseURL}/users/login`;
        const base64Credentials = btoa(`${email}:${password}`);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${base64Credentials}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login response data:", data);
                const token = data.token;

                if (!token) {
                    console.error("Token is undefined in the response.");
                    return { success: false, message: "Token is missing from the response." };
                }

                const userId = data.user.id;

                if (userId) {
                    // Return user data without setting cookies directly
                    return { success: true, user: data.user, token: token };
                } else {
                    return { success: false, message: 'Failed to fetch user information.' };
                }
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData.message || 'Login failed' };
            }
        } catch (error) {
            console.error('Error logging in:', error);
            return { success: false, message: 'An error occurred while logging in' };
        }
    }

    /**
     * Set a cookie with specified key and value.
     * @param {string} key - The name of the cookie.
     * @param {string} value - The value of the cookie.
     */
    setCookie(key, value) {
        const secureAttribute = window.location.protocol === 'https:' ? '; secure' : '';
        const cookieOptions = `path=/; max-age=${7 * 24 * 60 * 60}; samesite=strict${secureAttribute}`;
        document.cookie = `${key}=${value}; ${cookieOptions}`;
    }

    /**
     * Retrieve the value of a cookie by name.
     * @param {string} name - The name of the cookie.
     * @returns {string|null} - The value of the cookie, or null if not found.
     */
    getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
        return null;
    }

    /**
     * Set the league code and league ID in cookies.
     * @param {string} leagueCode - The league code to set.
     * @param {string} leagueID - The league ID to set.
     */
    setLeagueData(leagueCode, leagueID) {
        this.setCookie('leagueCode', leagueCode);
        this.setCookie('leagueID', leagueID);
    }

    /**
     * Get the league code stored in cookies.
     * @returns {string|null} - The league code, or null if not found.
     */
    getLeagueCode() {
        return this.getCookie('leagueCode');
    }

    /**
     * Get the league ID stored in cookies.
     * @returns {string|null} - The league ID, or null if not found.
     */
    getLeagueID() {
        return this.getCookie('leagueID');
    }

    /**
     * Log out the user by clearing authentication cookies and league data.
     */
    logoutUser() {
        document.cookie = 'authToken=; path=/; max-age=0; secure; samesite=strict';
        document.cookie = 'adminID=; path=/; max-age=0; secure; samesite=strict';
        document.cookie = 'leagueCode=; path=/; max-age=0; secure; samesite=strict';
        document.cookie = 'leagueID=; path=/; max-age=0; secure; samesite=strict';
    }

    /**
     * Check if the user is authenticated.
     * @returns {boolean} - True if authenticated, false otherwise.
     */
    isAuthenticated() {
        const adminID = this.getCookie('adminID');
        const authToken = this.getCookie('authToken');
        return !!(adminID && authToken);
    }

    /**
     * Get the user ID stored in cookies.
     * @returns {string|null} - The user ID, or null if not found.
     */
    getTUserID() {
        return this.getCookie('adminID');
    }

    /**
     * Get the authentication token stored in cookies.
     * @returns {string|null} - The auth token, or null if not found.
     */
    getAuthToken() {
        return this.getCookie('authToken');
    }
}

export default AuthService;
