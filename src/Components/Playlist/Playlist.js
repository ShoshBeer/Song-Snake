import React from "react";
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.css';

export class Playlist extends React.Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} />
                <Tracklist isRemoval={true} onRemove={this.props.onRemove} playlistName={this.props.playlistName} playlistTracks={this.props.playlistTracks} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}