import { SearchBar } from "../Components/SearchBar/SearchBar";

const clientID = '8160cc221c3148e3b8d0aed640dd3de9';
const redirectURI = "http://localhost:3000/";
const baseURL = 'https://api.spotify.com/v1/'

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
        const trackSearchEndpoint = 'search?type=track&q='
        const urlToFetch = baseURL + trackSearchEndpoint + searchTerm;
        const response = await fetch(urlToFetch, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        try {
            if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.map(song => song);
            }
        } catch(error) {
            console.log(error);
        }
    },

    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs) {
            return;
        }
        let headers = {Authorization: accessToken};
        let userID = '';
        try {
            const response = await fetch('https://api.spotify.com/v1/me', { headers: headers });
            if (response.ok) {
                const jsonResponse = await response.json();
                userID = jsonResponse.id;
            }
        } catch(error) {
            console.log(error);
        }
        const userPlaylistsEndpoint = `users/${userID}/playlists`;
        const urlToFetch = baseURL + userPlaylistsEndpoint;
        try {
            const response = await fetch(urlToFetch, {
                headers: headers,
                method: 'POST',
                body: {
                    'name': playlistName
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                const playlistID = jsonResponse.id;
                
                try {
                    const addResponse = await fetch(baseURL + `playlists/${playlistID}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: {
                            uris: trackURIs
                        }
                    })
                    if (addResponse.ok) {
                        const addJsonResponse = addResponse.json();
                        const snapShotID = addJsonResponse.snapshot_id;
                    }
                } catch(error) {
                    console.log(error);
                }
            }
        } catch(error) {
            console.log(error);
        }
    }
}

export { Spotify };