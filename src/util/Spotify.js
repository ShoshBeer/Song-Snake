const clientID = '8160cc221c3148e3b8d0aed640dd3de9';
// const redirectURI = "https://song-snake.netlify.app/";
//Change the redirectURI back to the above URL here and on Spotify for Developers before building
const redirectURI = "http://localhost:3000";
const baseURL = 'https://api.spotify.com/v1/';

let accessToken;

const Spotify = {
    getAccessToken() {
        let url = window.location.href;
        
        if (accessToken) {
            return accessToken;
        } else if (url.match(/access_token=([^&]*)/)) {
            accessToken = url.match(/access_token=([^&]*)/)[1];
            const expiry = Number(url.match(/expires_in=([^&]*)/)[1]);
            window.setTimeout(() => accessToken = '', expiry*1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },

    async search(searchTerm) {
        window.localStorage.setItem('termForRedirect', searchTerm);
        const accessToken = Spotify.getAccessToken();
        const trackSearchEndpoint = 'search?type=track&q='
        const urlToFetch = baseURL + trackSearchEndpoint + searchTerm;
        const response = await fetch(urlToFetch, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        try {
            if (response.ok) {
                const jsonResponse = await response.json();
                if (!jsonResponse.tracks) {
                    return [];
                } else {
                    return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }));
                }
            }
        } catch(error) {
            console.log(error);
        }
    },

    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
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
                body: JSON.stringify({ name: playlistName })
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                const playlistID = jsonResponse.id;
                
                try {
                    const PlaylistTracksEndpoint = `users/${userID}/playlists/${playlistID}/tracks`;
                    await fetch(baseURL + PlaylistTracksEndpoint, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackURIs })
                    })
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