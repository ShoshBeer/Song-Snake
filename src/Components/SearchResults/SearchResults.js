import React from 'react';
import { Tracklist } from '../Tracklist/Tracklist';
import './SearchResults.css';

export class SearchResults extends React.Component {
    render() {
        let tracklist;
        if (this.props.playlistTracks.length > 0) {
            const lastTrack = this.props.playlistTracks[this.props.playlistTracks.length - 1];
            const filteredTracks = this.props.SearchResults.filter(track => track.artist !== lastTrack.artist);
            tracklist = <Tracklist tracks={filteredTracks} onAdd={this.props.onAdd} isRemoval={false} />;
        } else {
            tracklist = <Tracklist tracks={this.props.SearchResults} onAdd={this.props.onAdd} isRemoval={false} />;
        }
        
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                {tracklist}
            </div>
        );
    }
}