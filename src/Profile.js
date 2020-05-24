import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Playlists from "./Playlists";

const spotifyApi = new SpotifyWebApi();

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      activeButton: false,
      activeButtonTwo: false,
    };
  }
  componentDidMount() {
    this.getMe();
  }
  getMe() {
    spotifyApi.getMe().then((response) => {
      this.setState({
        user: response,
      });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <button
          className="button"
          onClick={() =>
            this.setState({ activeButton: !this.state.activeButton })
          }
        >
          User Profile
        </button>
        {this.state.activeButton === true && (
          <div>
            <div className="profile-wrapper">
              <img src={user.images[0].url} alt="profile-pic" />
              <div>
                <p>{user.display_name}</p>
                <p>Email: {user.email}</p>
                <p>Status: {user.product}</p>
                <button
                  className="button"
                  onClick={() =>
                    this.setState({
                      activeButtonTwo: !this.state.activeButtonTwo,
                    })
                  }
                >
                  View Playlists
                </button>
              </div>
            </div>
            {this.state.activeButtonTwo === true && <Playlists />}
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
