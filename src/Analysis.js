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

  componentDidMount() {
    this.getTrackAnalysis();
    this.getTrackFeatures();
  }

  async getTrackAnalysis() {
    const { id } = this.props;
    await spotifyApi.getAudioAnalysisForTrack(id).then((response) => {
      console.log({ getTrackAnalysis: response });
      this.setState({
        analysis: response,
      });
    });
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

  render() {
    const { features } = this.state;
    return (
      <div className="card-wrapper-2">
        <button
          className="button"
          onClick={() => this.setState({ active: !this.state.active })}
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Analysis;
