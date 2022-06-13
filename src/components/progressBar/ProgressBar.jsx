import React from "react";
import "./progressBar.scss";

const ProgressBar = ({ bgcolor, progress, height }) => {
  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
  };

  const progresstext = {
    paddingRight: 35,
    paddingLeft: 35,
    color: "black",
    fontWeight: 900,
    textAllign: "center",
  };

  return (
    <div className="parentDiv">
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
