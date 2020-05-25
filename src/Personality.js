import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class PersonalityTest extends Component {
  constructor() {
    super();
    this.state = {
      features: [],
    };
  }
  componentDidMount() {
    this.getTrackFeatures();
  }

  getTrackFeatures() {
    const { trackIds } = this.props;
    console.log({ TrackIds: trackIds });
    spotifyApi.getAudioFeaturesForTracks(trackIds).then((response) => {
      console.log({ MultipleFeatures: response });
      this.setState({
        features: response,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Top Tracks</h1>
      </div>
    );
  }
}

export default PersonalityTest;
