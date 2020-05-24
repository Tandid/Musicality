import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Analysis extends Component {
  constructor() {
    super();
    this.state = {
      Analysis: [],
      Features: [],
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
        Analysis: response,
      });
    });
  }

  async getTrackFeatures() {
    const { id } = this.props;
    await spotifyApi.getAudioFeaturesForTrack(id).then((response) => {
      console.log({ getTrackFeatures: response });
      this.setState({
        Analysis: response,
        Features: response,
      });
    });
  }

  render() {
    return (
      <div className="card-wrapper-2">
        <h1> Song Analysis</h1>
      </div>
    );
  }
}

export default Analysis;
