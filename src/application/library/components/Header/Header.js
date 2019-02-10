import React from "react";
import "./Header.css";

//import userImage from "./user.svg";

const Header = ({
  src,
  alt,
  token,
  id
}) => {
  if (token === null) {
    //console.log('Header: not logged in');
    return (
      <div className="nav-header">
        <div className="nav-header-logo">
          <a href="/">
            <img className="logo-image" src={src} alt={alt} />
          </a>
        </div>
        <div className="nav-header-links">
          <ul>
            <li><button onClick={() => window.location.href = '/about'}>About Us</button></li>
          </ul>
        </div>
      </div>
    )
  } else {
    //console.log('Header-id: ' + id);
    //console.log('Header-token: ' + token);
    var userImage = "/" + id + ".png";
    return (
      <div className="nav-header">
        <div className="nav-header-logo">
          <a href="/">
            <img className="logo-image" src={src} alt={alt} />
          </a>
        </div>
        <div className="nav-header-user">
          <ul>
            <li><button onClick={() => window.location.href = "/"}><img src={userImage} alt="" className="user-image" /></button></li>
          </ul>
        </div>
      </div>
    )
  }
};

export default Header;
