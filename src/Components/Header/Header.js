import React, {Component} from "react";
import logo from '../../Assets/purplescuffedspotify.png'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <header>
        <div id="container">
          <img src={logo} id="logo" alt="img_loading..."/>
          <h1 id="name">Spotify++</h1>
        </div>
      </header>
    );
  }
} 

export default Header;