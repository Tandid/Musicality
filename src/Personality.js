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
      speechiness: 0,
      personality: [
        { type: "Integrator" },
        { type: "Guardian" },
        { type: "Driver" },
        { type: "Pioneer" },
      ],
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
      const avgSpeechiness = () => {
        return (
          response.audio_features.reduce((accum, feature) => {
            return accum + feature.speechiness;
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
        speechiness: avgSpeechiness(),
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
    const {
      danceability,
      energy,
      tempo,
      valence,
      personality,
      speechiness,
    } = this.state;
    // console.log({ Danceability: this.getAverageDanceability() });

    return (
      <div>
        <h1>Your Personality Type Is:</h1>
        <div>
          {energy >= 0.6 && valence < 0.4 && <h2>{personality[0].type}</h2>}
          {tempo < 100 && danceability < 0.6 && <h2>{personality[1].type}</h2>}
          {speechiness > 0.1 && <h2>{personality[2].type}</h2>}
          {danceability > 0.6 && <h2>{personality[3].type}</h2>}
        </div>
        <div className="avg-analysis">
          <p>Danceability: {danceability}</p>
          <p>Energy: {energy}</p>
          <p>Tempo: {tempo}</p>
          <p>Valence: {valence}</p>
          <p>Speechiness: {speechiness}</p>
        </div>
      </div>
    );
  }
}

export default PersonalityTest;
