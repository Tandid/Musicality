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
      console.log({ RelatedArtists: response });
      this.setState({
        RelatedArtists: response.tracks,
      });
    });
  }

  render() {
    let { relatedArtists } = this.state;
    relatedArtists = relatedArtists.slice(0, 3);
    return (
      <ul className="top-five">
        <h3> Related Artists </h3>
        {relatedArtists.map((related) => {
          return (
            <li key={related.id}>
              <p>{related.name}</p>
              <img src={related.images[1].url} alt="related-img" />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default RelatedArtists;
