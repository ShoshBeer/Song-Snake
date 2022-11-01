import React from "react";
import './TrackList.css';
import Track from '../Track/Track';

export class TrackList extends React.Component {
    render() {
        const listOfTracks = this.props.tracks.map((track) => {
            <Track key={track.id} track={track}/>
        });
        return (
            <div className="TrackList">
                {listOfTracks};
            </div>
        );
    }
}