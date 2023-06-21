import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';
import { AIFuncs } from '../../util/OpenAI';
import icon from '../../resources/snake.png';
import React, { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer.js';
import { ThemeInput } from '../ThemeInput/ThemeInput';

export function App (props) {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [term, setTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [randomWord, setRandomWord] = useState('');
  const [themeInput, setThemeInput] = useState('');
  const [theme, setTheme] = useState('');

  function addTrack(track) {
    const dupCheck = (song) => song.id === track.id;
    const duplicate = playlistTracks.some(dupCheck);
    if (duplicate) {
      return;
    } else {
      setPlaylistTracks((playlistTracks) => [...playlistTracks, track]);
       //added selected song to playlist tracks state and rendered by Playlist component
    }
  }

  function removeTrack(track) {
    const songCheck = (song) => song.id !== track.id;
    setPlaylistTracks((playlistTracks) => playlistTracks.filter(songCheck));
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs);
    setPlaylistName('');
    setPlaylistTracks([]);
    document.getElementById('playlistName').value = '';
    //this should be updated to set parent state and pass that change to Playlist component which should detect the change with a useEffect and re-render
  }

  async function search(searchTerm) {
    const results = await Spotify.search(searchTerm);
    setSearchResults(results);
  }

  async function themeSearch(theme=null) {
    if (theme) {
      const songsString = await AIFuncs.getSongs(theme);
      console.log(songsString);
    } else {
      const AItheme = await AIFuncs.getTheme()
      const songsString = await AIFuncs.getSongs(AItheme);
      console.log(AItheme, songsString);
    }
  }

  useEffect(() => {
    themeSearch(theme);
  }, [theme])

  // function findSharedWord() {
  //   const trackObj = playlistTracks[playlistTracks.length - 1];
  //   //track of interest is the most recently added aka last item in the playlistTracks list
  //   const stringWords = `${trackObj.name} ${trackObj.artist} ${trackObj.album}`;
  //   //a string of all the words in the title, artist, and album of the song
  //   const exclusionList = ['feat', 'album', 'single', 'remastered', 'original', 'soundtrack', 'edit', 'hits', 'greatest', 'instrumental', 'remix'];
  //   //words found in titles, artists, and albums that aren't really identifiers
  //   const wordsReformatted = stringWords.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').toLowerCase().split(' ');
  //   //special characters are removed from the string and all words are added to an array
  //   const words = wordsReformatted.filter(word => {
  //     const differentWord = word !== randomWord;
  //     const longEnough = word.length > 3;
  //     const excludedWord = exclusionList.includes(word);
  //     return longEnough && !excludedWord && differentWord;
  //   });
  //   //final word list created by removing words less than 4 letters and words in the exclusion list
  //   const word = words[Math.floor(Math.random()*words.length)]
  //   // //random word is selected from list
  //   return word;
  // }

  // useEffect(() => {
  //   //this is called when a new track is added to the playlist, so the next search is automatically sent
  //   if (playlistTracks.length > 0) {
  //     const word = findSharedWord();
  //     //randomWord won't be updated until after the search, but it will be updated before the next word is selected so it can prevent repeated words
  //     setRandomWord(word);
  //     //selected word from properties and updated state to new word
  //     setInputValue(word);
  //     //SearchBar displays the new word in the input field
  //     setTerm(word);
  //     //term change will be passed to Searchbar and trigger a useEffect that will search with the new term
  //   }
  // }, [playlistTracks])

  return (
    <div className='container'>
      <div className='header'>
        <img
          src={icon}
          className='icon'
          alt='Snake icon'
        ></img>
        <h1>Song Snake</h1>
      </div>

      <div className="App">

        <ThemeInput 
          setTheme={setTheme}
          setThemeInput={setThemeInput}
          themeInput={themeInput}
          // themeSearch={themeSearch} 
          />

        <SearchBar 
          onSearch={search}
          setTerm={setTerm}
          term={term}
          setInputValue={setInputValue}
          inputValue={inputValue} />

        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack} 
            playlistTracks={playlistTracks} />

          <Playlist 
            onSave={savePlaylist} 
            onNameChange={setPlaylistName} 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onRemove={removeTrack} 
            tracks={searchResults} />

        </div>
      </div>

      <div>
        <Footer />
      </div>

    </div>
  );

}
