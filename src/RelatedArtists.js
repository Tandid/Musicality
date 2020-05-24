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
              <li key={related.id}>
                <p>{related.name}</p>
                <img src={related.images[2].url} alt="related-img" />
                <RelatedArtists id={related.id} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RelatedArtists;
