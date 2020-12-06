import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";
import { Button, Card } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HorizontalSlider = () => {
  useEffect(() => {
    document.querySelectorAll(".slick-arrow").forEach((item) => {
      item.style.width = "35px";
      item.style.height = "35px";
      item.style.borderRadius = "100px";
      item.style.zIndex = "1000";
      item.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.2)";
    });
    document.querySelectorAll(".slick-next").forEach((item) => {
      item.style.right = "20px";
    });
    document.querySelectorAll(".slick-prev").forEach((item) => {
      item.style.left = "20px";
    });
    document.querySelectorAll(".slick-next:before").forEach((item) => {
      item.style.color = "black !important";
    });
    document.styleSheets[0].addRule(
      ".slick-next:before",
      "color: white !important"
    );
    document.styleSheets[0].addRule(
      ".slick-prev:before",
      "color: white !important"
    );

    // function updateSize() {
    //   if (window.innerWidth > 1700) setVisibleSlides(3);
    //   else if (widthBetween(1200, 1700)) setVisibleSlides(3);
    //   else if (widthBetween(800, 1200)) setVisibleSlides(2);
    //   else if (window.innerWidth <= 800) setVisibleSlides(1);
    // }
    // window.addEventListener("resize", updateSize);
  }, []);

  const [visibleSlides, setVisibleSlides] = useState(3);

  //Check if width is between given range
  const widthBetween = (smaller, larger) => {
    if (window.innerWidth <= larger && window.innerWidth > smaller) {
      return true;
    } else {
      return false;
    }
  };

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    accessibility: true,
    lazyload: true,
    slidesToShow: 1,
    swipeToSlide: true,
    dots: false,
    autoplay: true,
    slidesToScroll: 1,
  };

  const slides = [
    {
      image: "",
      title: "Event 1",
      button: "",
    },
    {
      image: "",
      title: "Event 2",
      button: "",
    },
    {
      image: "",
      title: "Event 3",
      button: "",
    },
    {
      image: "",
      title: "Event 4",
      button: "",
    },
  ];

  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.slider}>
        {slides.map((slide, index) => {
          return (
            <Card key={slide.title} className={styles.card}>
              <div
                className={styles.outerDiv}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className={styles.innerDiv}>
                  <h2>{slide.title}</h2>
                  <Button className={styles.showMoreBtn}>Show More</Button>
                </div>
              </div>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
};

export default HorizontalSlider;
