import Divider from "../main-components/Divider";
import "./ChannelTitleElement.scss";
import { serverURL } from "../../script/server";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

const ChannelTitleElement = ({ channel, topic, aosEffect }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);
  const imageUrl = channel.avatar
    ? `${serverURL}/api/v1/media/${channel.avatar}`
    : null;
  return (
    <section className="channel-title-element">
      <div className="channel-title-element__wrapper channel-title-element__wrapper_small">
        {channel.avatar ? (
          <img
            data-aos="zoom-fade-in"
            className="channel-title-element__img"
            src={imageUrl}
            alt={channel.name}
          />
        ) : (
          <div
            data-aos="zoom-fade-in"
            className="channel-list-item__logo channel-list-item__logo-placeholder channel-list-item__logo-placeholder_xxl"
            style={{ backgroundColor: channel.logoPlaceholderColor }}
          >
            <span data-aos="zoom-fade-in">
              {channel?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="channel-title-element__wrapper channel-title-element__wrapper_large">
        <h1
          data-aos='zoom-fade-in'
          className={
            topic
              ? "channel-title-element__title"
              : "channel-title-element__title_no-topic"
          }
        >
          {channel.name}
        </h1>
        {topic ? (
          <span data-aos="zoom-fade-in" className="channel-title-element__subtitle">{topic.name}</span>
        ) : (
          <></>
        )}

        <Divider />
      </div>
    </section>
  );
};

export default ChannelTitleElement;
