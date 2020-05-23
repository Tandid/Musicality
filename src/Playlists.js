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
    const { user } = this.props;
    return (
      <div className="card-wrapper">
        <h1>{user}'s Playlists</h1>
        {/* <button onClick={() => this.getUserPlaylists()}>
          Load Public Playlists
        </button> */}
        <ul className="playlists">
          {playlists.map((playlist) => {
            return (
              <li key={playlist.id}>
                <p>{playlist.name}</p>
                <img src={playlist.images[2].url} alt="playlist-img" />
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
