import { SearchBar } from "../Components/SearchBar/SearchBar";

const clientID = '8160cc221c3148e3b8d0aed640dd3de9';
const redirectURI = "http://localhost:3000/";

let accessToken = '';

let Spotify = {
    getAccessToken() {
        let url = window.location.href;
        
        if (accessToken) {
            return accessToken;
        } else if (url.match(/access_token=([^&]*)/)) {
            accessToken = url.match(/access_token=([^&]*)/);
            let expiry = url.match(/expires_in=([^&]*)/);
            window.setTimeout(() => accessToken = '', expiry*1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },

    async search(searchTerm) {
        let baseURL = 'https://api.spotify.com/v1/search?type=track&q='
        let urlToFetch = baseURL + searchTerm;
        const response = await fetch(urlToFetch, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        if (response.ok) {
            let jsonResponse = response.json();
        }

        return jsonResponse.map(song => song);

    }
}

export { Spotify };