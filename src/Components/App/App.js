import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';
import React from 'react';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      SearchResults: [
        {name: 'name1', artist: 'artist1', album: 'album1', id: 1},
        {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
        {name: 'name3', artist: 'artist3', album: 'album3', id: 3} ],

      playlistName: 'Ooga Chaka',

      playlistTracks: [
        {name: 'Yours', artist: 'KingGLW', album: 'Butterfly 3000', id: 4},
        {name: 'Shanghai', artist: 'KGizzardLW', album: 'Butterfly 3001', id: 5},
        {name: 'Dreams', artist: 'KGLizzardW', album: 'Butterfly 3002', id: 6},
        {name: 'Blue Morpho', artist: 'KGLWizard', album: 'Butterfly 3002', id: 7} ]
     };
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlaylistName = this.updatePlaylistName.bind(this);
     this.savePlaylist = this.savePlaylist.bind(this);
     this.search = this.search.bind(this);
  }

  addTrack(track) {
    const dupCheck = (song) => song.id === track.id;
    const duplicate = this.state.playlistTracks.some(dupCheck);
    if (duplicate) {
      return 'This song is already in your playlist.';
    } else {
      const addedTrack = this.state.playlistTracks.push(track);
      this.setState({playlistTracks: addedTrack});
    }
  }

  removeTrack(track) {
    const songCheck = (song) => song.id !== track.id;
    this.setState({playlistTracks: this.state.playlistTracks.filter(songCheck)});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks);
    this.setState({
      playlistName: '',
      playlistTracks: []
    });
    //let trackURIs;
    //this.state.playlistTracks.forEach( track => { trackURIs.push(track.id) });
  }

  search(searchTerm) {
    const results = Spotify.search(searchTerm);
    this.setState({SearchResults: results});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} tracks={this.state.SearchResults} />
          </div>
        </div>
      </div>
    );
  }
}
