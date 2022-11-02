import React from "react";
import './TrackList.css';
import Track from '../Track/Track';

export class TrackList extends React.Component {
    render() {
        const listOfTracks = this.props.tracks.map((track) => {
            <Track onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} key={track.id} track={track} onAdd={this.props.onAdd} />
        });
        return (
            <div className="TrackList">
                {listOfTracks};
            </div>
        );
    }
}