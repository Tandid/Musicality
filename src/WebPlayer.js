import React, { Component } from "react";
import Analysis from "./Analysis";

import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class WebPlayer extends Component {
  constructor() {
    super();
    this.state = {
      player: { device_id: "", deviceName: "" },
      nowPlaying: { name: "Not Checked", albumArt: "", id: "" },
    };
  }
  componentDidMount() {
    this.getNowPlaying();
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
        player: {
          deviceId: response.device.id,
          deviceName: response.device.name,
        },
      });
    });
  }

  pause() {
    spotifyApi.pause(this.state.player);
  }

  play() {
    spotifyApi.play(this.state.player);
  }

  next() {
    spotifyApi.skipToNext(this.state.player);
  }

  previous() {
    spotifyApi.skipToPrevious(this.state.player);
  }

  render() {
    const { nowPlaying, player } = this.state;

    return (
      <div>
        <div>
          <h1>Web Player</h1>
          <h4>Device: {player.deviceName}</h4>
        </div>
        <div>{nowPlaying.name}</div>
        <img
          className="web-player-img"
          src={nowPlaying.albumArt}
          alt="album-art"
        />
        <div>
          <button className="button-2" onClick={() => this.previous()}>
            Previous
          </button>
          <button className="button-2" onClick={() => this.pause()}>
            Pause
          </button>
          <button className="button-2" onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
          <button className="button-2" onClick={() => this.play()}>
            Play
          </button>
          <button className="button-2" onClick={() => this.next()}>
            Next
          </button>
        </div>
        {nowPlaying.id && <Analysis id={nowPlaying.id} />}
      </div>
    );
  }
}

export default WebPlayer;
