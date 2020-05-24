import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class RelatedArtists extends Component {
  constructor() {
    super();
    this.state = {
      relatedArtists: [],
    };
  }

  componentDidMount() {
    this.getRelated();
  }

  async getRelated() {
    const { id } = this.props;
    await spotifyApi.getArtistRelatedArtists(id).then((response) => {
      this.setState({
        relatedArtists: response.artists,
      });
    });
  }

  render() {
    let { relatedArtists } = this.state;
    relatedArtists = relatedArtists.slice(0, 3);
    return (
      <div>
        <h3> Related Artists </h3>
        <ul className="related-artists-wrapper">
          {relatedArtists.map((related) => {
            return (
              <li className="row" key={related.id}>
                <img src={related.images[2].url} alt="related-img" />
                <p>{related.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RelatedArtists;
