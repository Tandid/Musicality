import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      active: false,
    };
  }
  componentDidMount() {
    this.getMe();
  }
  getMe() {
    spotifyApi.getMe().then((response) => {
      console.log({ User: response });
      this.setState({
        user: response,
      });
    });
  }

  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <div>
        <button
          className="button"
          onClick={() => this.setState({ active: !this.state.active })}
        >
          Get User Profile
        </button>
        {this.state.active === true && (
          <div>
            <div>{user.display_name}</div>
            {/* <img src={user.images.url} alt="profile-pic" /> */}
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
