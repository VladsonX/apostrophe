import "./HotTopicsSlider.scss";
import { FaChevronLeft } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { FaChevronRight } from "react-icons/fa6";
import React, { useState } from "react";

const HotTopicsSlider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="hot-topics-slider-container">
      <div className="hot-topics-slider"
      style={{
        transform: `translateX(-${currentIndex * 100}%)`,}}
      >
        {React.Children.map(children, (child, index) => (
          <div
            className={`hot-topics-slider__slide ${
              index === currentIndex ? "active" : "inactive"
            }`}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="hot-topics-slider__buttons-wrapper">
        <IconContext.Provider
          value={{ size: "1rem", className: "hot-topics-slider__chevron" }}
        >
          <button id="hotSliderLeft" className="hot-topics-slider__button" onClick={handlePrev}>
            <FaChevronLeft />
          </button>
        </IconContext.Provider>
        <IconContext.Provider
          value={{ size: "1rem", className: "hot-topics-slider__chevron" }}
        >
          <button id="hotSliderRight" className="hot-topics-slider__button" onClick={handleNext}>
            <FaChevronRight />
          </button>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default HotTopicsSlider;
