import React from "react";
import { Tracklist } from '../Tracklist/Tracklist';
import './Playlist.css';

export function Playlist ({ onSave, onNameChange, playlistName, playlistTracks, onRemove }) {

  return (
    <div className="Playlist">
      <input
        onChange={e => onNameChange(e.target.value)}
        placeholder='Name Your Playlist!'
        id='playlistName'
        value={playlistName}
      />
      <Tracklist
        isRemoval={true}
        onRemove={onRemove}
        playlistName={playlistName}
        tracks={playlistTracks} />
      <button onClick={onSave} className="Playlist-save" >Save to Spotify</button>
    </div>
  )
}
