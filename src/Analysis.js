import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Analysis extends Component {
  constructor() {
    super();
    this.state = {
      analysis: [],
      features: [],
      active: false,
    };
  }

  async getTrackFeatures() {
    const { id } = this.props;
    await spotifyApi.getAudioFeaturesForTrack(id).then((response) => {
      console.log({ getTrackFeatures: response });
      this.setState({
        features: response,
      });
    });
  }

  onClick() {
    this.getTrackFeatures();
    this.setState({ active: true });
  }

  render() {
    const { features } = this.state;
    return (
      <div className="card-wrapper-2">
        <button
          className="button"
          onClick={() => {
            this.onClick();
          }}
        >
          Get Song Analysis
        </button>
        {this.state.active === true && (
          <div>
            <h1> Song Analysis </h1>
            <div>
              <p> Acousticness: {features.acousticness}</p>
              <p> Danceability: {features.danceability}</p>
              <p> Energy: {features.energy}</p>
              <p> Tempo: {features.tempo}</p>
              <p> Valence(Positiveness) : {features.valence}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Analysis;
