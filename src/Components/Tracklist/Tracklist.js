import React from "react";
import './Tracklist.css';
import { Track } from '../Track/Track';

export class Tracklist extends React.Component {
  render() {
    if (this.props.tracks.length) {
      const listOfTracks = this.props.tracks.map((track) => {
        return (<Track
          onRemove={this.props.onRemove}
          isRemoval={this.props.isRemoval}
          key={track.id}
          track={track}
          onAdd={this.props.onAdd} />);
      });
      return (
        <div className="TrackList">
          {listOfTracks}
        </div>
      );
    } else {
      return (
        <div className="TrackList">
        </div>
      );
    }
  }
}