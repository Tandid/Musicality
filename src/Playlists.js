import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Playlists extends Component {
  constructor() {
    super();
    this.state = {
      playlists: [],
    };
  }

  componentDidMount() {
    this.getUserPlaylists();
  }

  getUserPlaylists() {
    spotifyApi.getUserPlaylists().then((response) => {
      console.log(response);
      this.setState({
        playlists: response.items,
      });
    });
  }

  render() {
    const { playlists } = this.state;
    console.log(playlists);
    return (
      <div className="card-wrapper">
        <button onClick={() => this.getUserPlaylists()}>
          Load Public Playlists
        </button>
        <ul>
          {playlists.map((playlist) => {
            return (
              <li>
                <p>{playlist.name}</p>
                <img src={playlist.images[1]} alt="playlist-img" />
                <p>Total Tracks: {playlist.tracks.total}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Playlists;
