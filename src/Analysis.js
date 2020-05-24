import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Analysis extends Component {
  constructor() {
    super();
    this.state = {
      Analysis: [],
    };
  }

  componentDidMount() {
    this.getTrackAnalysis();
  }

  getTrackAnalysis() {
    const { id } = this.props;
    spotifyApi.getAudioAnalysisForTrack(id).then((response) => {
      console.log({ getTrackAnalysis: response });
      this.setState({
        Analysis: response,
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
