import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";

const spotifyApi = new SpotifyWebApi();

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      img: "",
      activeButton: false,
    };
  }

  componentDidMount() {
    this.getMe();
  }

  getMe() {
    spotifyApi.getMe().then((response) => {
      console.log(response.images[0].url);
      this.setState({
        user: response,
        img: response.images[0].url,
      });
    });
  }

  render() {
    const { user, img } = this.state;

    return (
      <div>
        <div>
          <div className="profile-wrapper">
            <img src={img} alt="profile-pic" />
            <div>
              <p>{user.display_name}</p>
              <p>Email: {user.email}</p>
              <p>Status: {user.product}</p>
              <button
                className="button"
                onClick={() =>
                  this.setState({
                    activeButton: !this.state.activeButton,
                  })
                }
              >
                {this.state.activeButton === false
                  ? "Personality Analysis"
                  : "Hide"}
              </button>
            </div>
          </div>
          {this.state.activeButton === true && (
            <div>
              <TopTracks />
              <TopArtists />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
