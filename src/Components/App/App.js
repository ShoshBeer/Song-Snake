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
      SearchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
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
      return;
    } else {
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks: this.state.playlistTracks});
    }
    const word = this.findSharedWord();
    this.search(word);
    const searchField = document.getElementById('input');
    searchField.value = word;
  }

  removeTrack(track) {
    const songCheck = (song) => song.id !== track.id;
    this.setState({playlistTracks: this.state.playlistTracks.filter(songCheck)});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map( track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  async search(searchTerm) {
    const results = await Spotify.search(searchTerm);
    this.setState({ SearchResults: results });
  }

  findSharedWord() {
    const trackObj = this.state.playlistTracks[this.state.playlistTracks.length - 1];
    const stringWords = trackObj.name + ' ' + trackObj.artist + ' ' + trackObj.album;
    const exclusionList = ['feat', 'album', 'single', 'remastered', 'with', 'original', 'soundtrack', 'edit', 'hits', 'greatest'];
    const wordsReformatted = stringWords.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase().split(' ');
    const words = wordsReformatted.filter(word => {
      const longEnough = word.length > 3;
      const excludedWord = exclusionList.includes(word);
      return longEnough && !excludedWord;
    });
    console.log(words);
    const word = words[Math.floor(Math.random()*words.length)]
    return word;
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} searchTerm={this.state.searchTerm} />
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} tracks={this.state.SearchResults} />
          </div>
        </div>
      </div>
    );
  }
}
