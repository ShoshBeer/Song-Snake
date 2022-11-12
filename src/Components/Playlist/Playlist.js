import React from "react";
import { Tracklist } from '../Tracklist/Tracklist';
import './Playlist.css';

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }
    
    render() {
        return (
            <div className="Playlist">
                <input 
                    onChange={this.handleNameChange} 
                    placeholder='Name Your Playlist!' 
                    id='playlistName' />
                <Tracklist 
                    isRemoval={true} 
                    onRemove={this.props.onRemove} 
                    playlistName={this.props.playlistName} 
                    tracks={this.props.playlistTracks} />
                <button onClick={this.props.onSave} className="Playlist-save" >SAVE TO SPOTIFY</button>
            </div>
        )
    }
}