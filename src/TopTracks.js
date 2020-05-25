import React, { Component } from "react";
import PersonalityTest from "./Personality";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class TopTracks extends Component {
  constructor() {
    super();
    this.state = {
      topTracks: [],
      trackIds: [],
    };
  }
  componentDidMount() {
    this.getTopTracks();
  }

  async getTopTracks() {
    await spotifyApi.getMyTopTracks().then((response) => {
      console.log({ TopTracks: response.items });
      this.setState({
        topTracks: response.items,
        trackIds: response.items.map((track) => track.id),
      });
    });
  }

  render() {
    let { topTracks, trackIds } = this.state;
    topTracks = topTracks.slice(0, 10);

    return (
      <div>
        <h1>Top Tracks</h1>
        {topTracks.map((track) => {
          return <li key={track.id}>{track.name}</li>;
        })}
        {trackIds.length >= 1 && <PersonalityTest trackIds={trackIds} />}
      </div>
    );
  }
}

export default TopTracks;
