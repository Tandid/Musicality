import React, { Component } from "react";
import PersonalityTest from "./Personality";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class TopTracks extends Component {
  constructor() {
    super();
    this.state = {
      topTracks: [],
      trackIds: [],
      activeButton: false,
    };
  }
  componentDidMount() {
    this.getTopTracks();
  }

  async getTopTracks() {
    await spotifyApi.getMyTopTracks().then((response) => {
      console.log({ TopTracks: response.items });
      this.setState({
        topTracks: response.items,
        trackIds: response.items.map((track) => track.id),
      });
    });
  }

  render() {
    const { topTracks, trackIds } = this.state;
    let firstHalf = topTracks.slice(0, 5);
    let secondHalf = topTracks.slice(5, 10);

    return (
      <div>
        <button
          className="button"
          onClick={() =>
            this.setState({ activeButton: !this.state.activeButton })
          }
        >
          {this.state.activeButton === false
            ? "Find Personality"
            : "Hide Personality"}
        </button>
        {this.state.activeButton === true && (
          <div className="analysis-wrapper">
            {trackIds.length >= 1 && <PersonalityTest trackIds={trackIds} />}
            <h1>My Top Tracks</h1>
            <div className="top-tracks-wrapper">
              <div>
                {firstHalf.map((track) => {
                  return (
                    <li className="row" key={track.id}>
                      <img
                        src={track.album.images[2].url}
                        alt="album-img"
                      ></img>
                      <p>
                        {track.name} by {track.artists[0].name}
                      </p>
                    </li>
                  );
                })}
              </div>
              <div>
                {secondHalf.map((track, idx) => {
                  return (
                    <li className="row" key={track.id}>
                      <img
                        src={track.album.images[2].url}
                        alt="album-img"
                      ></img>
                      <p>
                        {track.name} by {track.artists[0].name}
                      </p>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TopTracks;
