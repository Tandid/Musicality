import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import ArtistTopSongs from "./ArtistTopSongs";
import RelatedArtists from "./RelatedArtists";

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
              <li className="artist-topsong" key={topArtist.id}>
                <div>
                  <h2>#{idx + 1}</h2>
                  <h2>{topArtist.name}</h2>
                  <img
                    className="playlist-img"
                    src={topArtist.images[1].url}
                    alt="artist-img"
                  />
                  <p>Genres: </p>
                  <p>{topArtist.genres[0]},</p>
                  <p>{topArtist.genres[1]},</p>
                  <p>{topArtist.genres[2]}</p>
                </div>
                <div>
                  <ArtistTopSongs id={topArtist.id} />
                  <RelatedArtists id={topArtist.id} />
                </div>
              </li>
            );
          })}
        </ul>
        <ul className="topArtists">
          {topArtists.slice(0, 1).map((topArtist, idx) => {
            return <li className="artist-topsong" key={topArtist.id}></li>;
          })}
        </ul>
      </div>
    );
  }
}

export default TopArtists;
