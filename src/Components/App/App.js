import logo from './logo.svg';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import React from 'react';
import { ReactDOM } from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      SearchResults: [
        {name: null, artist: null, album: null, id: null},
        {name: null, artist: null, album: null, id: null} ],

      playlistName: 'Ooga Chaka',

      playlistTracks: [
        {name: 'Yours', artist: 'KGLW', album: 'Butterfly 3000', id: 1},
        {name: 'Shanghai', artist: 'KGLW', album: 'Butterfly 3000', id: 2},
        {name: 'Dreams', artist: 'KGLW', album: 'Butterfly 3000', id: 3},
        {name: 'Blue Morpho', artist: 'KGLW', album: 'Butterfly 3000', id: 4} ]
     };
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.some((song) => {
      song.id === track.id}) === false) {
        this.setState({playlistTracks: this.state.playlistTracks.push(track)});
    } 
  }

  removeTrack(track) {
    this.setState({playlistTracks: this.state.playlistTracks.filter( el => { el.id !== track.id })});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
