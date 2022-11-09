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
      playlistName: '',
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
    //added selected song to playlist tracks state and rendered by Playlist component
    const word = this.findSharedWord();
    this.search(word);
    //selected word from properties and searched the word, with results rendered by SearchResults component
    const searchField = document.getElementById('input');
    searchField.value = word;
    //selected word displayed in input field and rendered in SearchBar component
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
      playlistName: '',
      playlistTracks: []
    });
    document.getElementById('playlistName').value = '';
  }

  async search(searchTerm) {
    const results = await Spotify.search(searchTerm);
    this.setState({ SearchResults: results });
  }

  findSharedWord() {
    const trackObj = this.state.playlistTracks[this.state.playlistTracks.length - 1];
    //this is called right after a song is added to the playlist, so the track is set to the last item in the playlistTracks list
    const stringWords = trackObj.name + ' ' + trackObj.artist + ' ' + trackObj.album;
    //a string of all the words in the title, artist, and album of the song
    const exclusionList = ['feat', 'album', 'single', 'remastered', 'with', 'original', 'soundtrack', 'edit', 'hits', 'greatest', 'instrumental', 'remix'];
    //words found in titles, artists, and albums that aren't really identifiers
    const wordsReformatted = stringWords.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').toLowerCase().split(' ');
    //special characters are removed from the string and all words are added to an array
    const words = wordsReformatted.filter(word => {
      const longEnough = word.length > 3;
      const excludedWord = exclusionList.includes(word);
      return longEnough && !excludedWord;
    });
    //final word list created by removing words less than 4 letters and words in the exclusion list
    console.log(words);
    const word = words[Math.floor(Math.random()*words.length)]
    //random word is selected from list
    return word;
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} searchTerm={this.state.searchTerm} />
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} playlistTracks={this.state.playlistTracks} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} tracks={this.state.SearchResults} />
          </div>
        </div>
      </div>
    );
  }
}
