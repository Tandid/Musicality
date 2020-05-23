import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import ArtistTopSongs from "./ArtistTopSongs";

const spotifyApi = new SpotifyWebApi();

class TopArtists extends Component {
  constructor() {
    super();
    this.state = {
      topArtists: [],
    };
  }

  componentDidMount() {
    this.getTopArtists();
  }

  async getTopArtists() {
    await spotifyApi.getMyTopArtists().then((response) => {
      console.log({ TopArtists: response });
      this.setState({
        topArtists: response.items,
      });
    });
  }

  render() {
    let { topArtists } = this.state;
    topArtists = topArtists.slice(0, 3);
    // const { user } = this.props;
    return (
      <div className="card-wrapper-2">
        <h1> My Top Artists</h1>
        <ul className="topArtists">
          {topArtists.map((topArtist, idx) => {
            return (
              <li key={topArtist.id}>
                <div>
                  <p>#{idx + 1}</p>
                  <p>{topArtist.name}</p>
                  <img
                    className="playlist-img"
                    src={topArtist.images[1].url}
                    alt="artist-img"
                  />
                </div>
                <div>
                  <ArtistTopSongs id={topArtist.id} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TopArtists;
