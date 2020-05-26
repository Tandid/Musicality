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
    const speechiness = Number(features.speechiness).toFixed(2);
    const danceability = Number(features.danceability).toFixed(2);
    const energy = Number(features.energy).toFixed(2);
    const tempo = Number(features.tempo).toFixed(0);
    const valence = Number(features.valence).toFixed(2);
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
              <p> Danceability: {danceability}</p>
              <p> Energy: {energy}</p>
              <p> Tempo: {tempo}</p>
              <p> Valence(Positiveness) : {valence}</p>
              <p> Speechiness: {speechiness}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Analysis;
