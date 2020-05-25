import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class PersonalityTest extends Component {
  constructor() {
    super();
    this.state = {
      features: [],
      danceability: 0,
      energy: 0,
      tempo: 0,
      valence: 0,
    };
    // this.getAverageDanceability = this.getAverageDanceability.bind(this);
  }
  componentDidMount() {
    this.getTrackFeatures();
  }

  getTrackFeatures() {
    const { trackIds } = this.props;
    console.log({ TrackIds: trackIds });
    spotifyApi.getAudioFeaturesForTracks(trackIds).then((response) => {
      const avgDanceability = () => {
        return (
          response.audio_features.reduce((accum, feature) => {
            return accum + feature.danceability;
          }, 0) / response.audio_features.length
        );
      };

      const avgEnergy = () => {
        return (
          response.audio_features.reduce((accum, feature) => {
            return accum + feature.energy;
          }, 0) / response.audio_features.length
        );
      };

      const avgTempo = () => {
        return (
          response.audio_features.reduce((accum, feature) => {
            return accum + feature.tempo;
          }, 0) / response.audio_features.length
        );
      };

      const avgValence = () => {
        return (
          response.audio_features.reduce((accum, feature) => {
            return accum + feature.valence;
          }, 0) / response.audio_features.length
        );
      };

      console.log({ MultipleFeatures: response.audio_features });
      this.setState({
        // features: response.audio_features,
        danceability: avgDanceability(),
        energy: avgEnergy(),
        tempo: avgTempo(),
        valence: avgValence(),
      });
    });
  }

  //   getAverageDanceability() {
  //     const { features } = this.state;
  //     if (features.length >= 1) {
  //       return (
  //         features.reduce((accum, feature) => {
  //           return accum + feature.danceability;
  //         }, 0) / features.length
  //       );
  //     }
  //   }

  render() {
    const { danceability, energy, tempo, valence } = this.state;
    // console.log({ Danceability: this.getAverageDanceability() });

    return (
      <div>
        <h1>Analysis</h1>
        <p>Danceability: {danceability}</p>
        <p>Energy: {energy}</p>
        <p>Tempo: {tempo}</p>
        <p>Valence: {valence}</p>
      </div>
    );
  }
}

export default PersonalityTest;
