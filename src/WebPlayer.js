import React, { Component } from "react";
import Analysis from "./Analysis";

import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class WebPlayer extends Component {
  constructor() {
    super();
    this.state = {
      nowPlaying: { name: "Not Checked", albumArt: "", id: "" },
    };
  }
  componentDidMount() {
    this.getNowPlaying();
  }
  getMe() {
    spotifyApi.getMe().then((response) => {
      this.setState({
        user: response,
      });
    });
  }

  async getNowPlaying() {
    await spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log({ nowPlaying: response });
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[1].url,
          id: response.item.id,
        },
      });
    });
  }

  render() {
    const { nowPlaying } = this.state;

    return (
      <div>
        <div>Now Playing: {nowPlaying.name}</div>
        <img src={nowPlaying.albumArt} alt="album-art" />
        <div>
          <button className="button" onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        </div>
        {nowPlaying.id && <Analysis id={nowPlaying.id} />}
      </div>
    );
  }
}

export default WebPlayer;
