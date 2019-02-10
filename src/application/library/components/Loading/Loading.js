import React from "react";
import "./Loading.css";

const Loading = ({
  text = "Loading..."
}) => (
  <div className="loading-container">
    <div className="loading-logo-holder-outer">
      <div className="loading-logo-holder-middle">
        <div className="loading-logo-holder-inner">

        </div>
      </div>
    </div>
  </div>
);

export default Loading;