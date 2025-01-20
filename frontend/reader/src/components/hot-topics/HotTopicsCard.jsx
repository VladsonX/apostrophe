import "./HotTopicsCard.scss";
import { CiTimer } from "react-icons/ci";
import { IconContext } from "react-icons";
import { NavLink } from "react-router";

const HotTopicsCard = () => {
  return (
    <div className="hot-topics-card">
      <div className="hot-topics-card__header">
        <div className="hot-topics-card__channel-wrapper">
          <img
            className="hot-topics-card__channel-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png"
            alt="channel-logo"
          />
          <h3 className="hot-topics-card__channel-name">Cable News Network</h3>
        </div>
        <div className="hot-topics-card__time-to-read-wrapper">
          <IconContext.Provider
            value={{ size: "1rem", className: "hot-topics-card__icon" }}
          >
            <CiTimer />
          </IconContext.Provider>
          <span className="hot-topics-card__time-to-read-text">
            5 minutes read
          </span>
        </div>
        <div className="hot-topics-card__published">
          Published 7:51 AM EST, Thu December 19, 2024
        </div>
      </div>
      <div className="hot-topics-card__content-wrapper">
        <div className="hot-topics-card__img-wrapper">
          <img
            className="hot-topics-card__img"
            src="https://assets.science.nasa.gov/dynamicimage/assets/science/astro/exo-explore/2023/09/s/SFL_1_illo.1280_copy.png?w=2560&format=webp&fit=clip&crop=faces%2Cfocalpoint"
            alt=""
          />
          <span className="hot-topics-card__img-descr">
            Earth’s surface is shown as it might have looked some 3.8 billion
            years ago, perhaps when life was just beginning, in this artist’s
            rendering. Illustration: NASA/JPL-Caltech/Lizbeth B. De La Torre
          </span>
        </div>
        <div className="hot-topics-card__text-wrapper">
          <h2 className="hot-topics-card__title">
            Beginnings: Life on Our World and Others
          </h2>
          <div className="hot-topics-card__snippet">
            Where do we begin? To chart the course of life in the cosmos, we
            might start with the first cells, moving and burning energy ­–
            perhaps in a hollow on Earth’s freshly minted surface, or a
            superheated vent at the bottom of an ancient sea. But a true
            understanding of life, on Earth or some other world, likely will
            require us to unravel even earlier beginnings: the ignition of stars
            with their freight of life’s building blocks, the formation of
            planets from protoplanetary disks, the energy and chemistry of
            surfaces and atmospheres.
          </div>
          <NavLink to={'article'}><button className="hot-topics-card__button">Read more</button></NavLink>
        </div>
      </div>
    </div>
  );
};

export default HotTopicsCard;
