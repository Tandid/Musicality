import React from "react";

class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <img
            className="logo"
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="logo"
          />
          <h2>Spotify Music Analysis</h2>
        </nav>
      </div>
    );
  }
}

export default Navbar;
