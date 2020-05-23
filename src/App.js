import React, { Component } from "react";
import Playlists from "./Playlists";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: "Not Checked", albumArt: "" },
      user: [],
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount() {
    this.getNowPlaying();
    this.getMe();
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[1].url,
        },
      });
    });
  }

  getMe() {
    spotifyApi.getMe().then((response) => {
      console.log(response);
      this.setState({
        user: response.display_name,
      });
    });
  }

  render() {
    const { user, nowPlaying } = this.state;
    return (
      <div className="App">
        <p>Hello, {user}</p>
        <a href="http://localhost:8888">
          {!this.state.loggedIn ? "Login to Spotify" : "Welcome"}
        </a>

        <div>Now Playing: {nowPlaying.name}</div>
        <div>
          <img src={nowPlaying.albumArt} alt="album-art" />
        </div>
        {this.state.loggedIn && (
          <div>
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
            <button onClick={() => this.getMe()}>
              Get Currently Playing Track
            </button>
            <Playlists user={this.state.user} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
