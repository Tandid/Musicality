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
        {
          type: "Amiable",
          summary:
            "The amiable member of your team will be patient, sympathetic and kind. Although they have a very likeable personality, amiable’s can be stubborn and selfish. They do tend to be easy going and diplomatic. Due to the calm nature of an amiable personality, they do not appreciate abrasiveness, therefore it is best to approach them gently, and with an extra level of kindness and consideration. If you are managing someone with an amiable personality, encourage them to take more risks and work closely with them, ensure you are not harsh and pushy to get the best out of your amiable team member.",
        },
        {
          type: "Analytical",
          summary:
            "Those with analytical personalities tend to be thoughtful, serious & purposeful. They will be the team members who are neat & tidy, self-disciplined and perfectionists. Due to their personality they can be indecisive and over-analyse, so to help them in a decision-making process it is best not to pressure them, rather give them encouragement, and time alone to think. It is important to provide an Analytical person with all the facts and information and speak softly and calmly when asking them to complete a task, but be patient with them throughout the task.",
        },
        {
          type: "Driver",
          summary:
            "Drivers are determined, decisive and confident. They will tend to strive to get a task completed, and will not be easily discouraged. Driver’s can sometimes seem like the natural-born leader of the team, but can sometimes appear to be insensitive and harsh. Drivers don’t necessarily need all the facts to make a decision, so when you need a decision from them, get to the point, and show your appreciation for their ability to get things done. Drivers greatly dislike being micromanaged, so give them some responsibility and give them the freedom to let them find the best path for reaching a goal or completing a task.",
        },
        {
          type: "Expressive",
          summary:
            "Your expressive team member will be the humorous, charismatic and outgoing. Expressive’s are ambitious and can be persuasive, however, they can also be undisciplined, loud and disorganised. When managing an expressive, show excitement and enthusiasm in the workplace, show an appreciation for their sense of humour and charisma. Those with an expressive personality needs broad structure in their jobs and the freedom to do their work. Remember, they can be more productive when you let them have fun, so the loud humour in the workplace may not always be a bad thing.",
        },
      ],
    };
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
        danceability: avgDanceability(),
        energy: avgEnergy(),
        tempo: avgTempo(),
        valence: avgValence(),
        speechiness: avgSpeechiness(),
      });
    });
  }

  render() {
    const {
      danceability,
      energy,
      tempo,
      valence,
      personality,
      speechiness,
    } = this.state;

    return (
      <div>
        <h1>You Are:</h1>
        <div className="personality-wrapper">
          {energy >= 0.6 && valence < 0.4 && (
            <div>
              <h1 className="amiable">{personality[0].type}</h1>
              <p>{personality[0].summary}</p>
            </div>
          )}
          {tempo < 100 && danceability < 0.6 && (
            <div>
              <h1 className="analytical">{personality[1].type}</h1>
              <p>{personality[1].summary}</p>
            </div>
          )}
          {speechiness > 0.1 && (
            <div>
              <h1 className="driver">{personality[2].type}</h1>
              <p>{personality[2].summary}</p>
            </div>
          )}
          {danceability > 0.6 && (
            <div>
              <h1 className="expressive">{personality[3].type}</h1>
              <p>{personality[3].summary}</p>
            </div>
          )}
        </div>
        <div className="avg-analysis">
          <h2>Your Music Style:</h2>
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
