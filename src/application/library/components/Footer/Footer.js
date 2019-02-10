import React from "react";
import "./Footer.css";

import fb from './images/fb-64.png';
import tw from './images/twitter-64.png';
import li from './images/linkedin-64.png';

const Footer = ({
  src,
  alt,
  token
}) => {
  var logoutButton = (<a href="/logout" className="logout-link">Logout</a>);
  if (token === null) {
    logoutButton = null;
  }
  return (
  <div className="nav-footer">
    <div className="footer-light">
      <a href="/">
        <img src={src} alt={alt} className="logo-image-footer" />
      </a>
      <div className="footer-copyright">
        <p>Copyright 2018 Team Zero. <br /> All rights reserved.</p>
      </div>
    </div>
    <div className="footer-dark">
      <div className="footer-icons">
        <a href="https://www.facebook.com/">
          <img src={fb} alt="Facebook" className="social-icon" />
        </a>
        <a href="https://twitter.com/">
          <img src={tw} alt="Twitter" className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/">
          <img src={li} alt="Linked In" className="social-icon" />
        </a>
      </div>
      <div className="footer-logout">
        { logoutButton }
      </div>
    </div>
  </div>
)};

export default Footer;
