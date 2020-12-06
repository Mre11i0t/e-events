import React from "react";
import "./slider.css";

export default class Slider extends React.Component {
  render() {
    return (
      <div>
        <div className="slideshow-container">
          <div className="mySlides fade">
            <div className="numbertext">1 / 3</div>
            <img
              src="image"
              style={{ width: "100%" }}
            />
            <div className="text">Caption Text</div>
          </div>

          <div className="mySlides fade">
            <div className="numbertext">2 / 3</div>
            <img src="img_snow_wide.jpg" style={{ width: "100%" }} />
            <div className="text">Caption Two</div>
          </div>

          <div className="mySlides fade">
            <div className="numbertext">3 / 3</div>
            <img src="img_mountains_wide.jpg" style={{ width: "100%" }} />
            <div className="text">Caption Three</div>
          </div>
        </div>
        <br />

        <div style={{ textAlign: "center" }}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  }
}
