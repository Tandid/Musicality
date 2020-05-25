import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class TopTracks extends Component {
  constructor() {
    super();
    this.state = {
      topTracks: [],
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
      });
    });
  }

  render() {
    let { topTracks } = this.state;
    topTracks = topTracks.slice(0, 10);

    return (
      <div>
        <h1>Top Tracks</h1>
        {topTracks.map((track) => {
          return <li key={track.id}>{track.name}</li>;
        })}
      </div>
    );
  }
}

export default TopTracks;
