import "./TopicsListItem.scss";
import { CiImageOn } from "react-icons/ci";
import { IconContext } from "react-icons";
import { mediaUrl } from "../../api/client";
import { FaCheck } from "react-icons/fa6";

const TopicsListItem = ({ channel, name, onClick, userImg, className, aosEffect, followed }) => {
  const logoUrl = channel.avatar ? mediaUrl(channel.avatar) : null;
  return (
    <li
      data-aos={aosEffect}
      onClick={onClick}
      className={followed ? className + " topics-list-item_channel-view_followed" : className}
    >
      {channel.avatar ? (
        <img className="topics-list-item__img" src={logoUrl} alt={channel.name} />
      ) : userImg ? (
        <img className="topics-list-item__img" src={userImg} alt={channel.name} />
      ) : channel.name ? (
        <div
          className="channel-list-item__logo channel-list-item__logo-placeholder"
          style={{ backgroundColor: channel.logoPlaceholderColor }}
        >
          <span>{channel.name.charAt(0).toUpperCase()}</span>
        </div>
      ) : (
        <div className="create-channel-logo__placeholder create-channel-logo__placeholder_small">
          <div>
            <IconContext.Provider
              value={{
                size: "2.5rem",
                className: "create-channel-logo__add-icon",
              }}
            >
              <CiImageOn />
            </IconContext.Provider>
          </div>
        </div>
      )}
      <span className="topics-list-item__divider"> / </span>
      <span className="topics-list-item__text">{name}</span>
      {followed ? (
        <IconContext.Provider
          value={{ size: "1rem", className: "topics-list-item__followed-icon" }}
        >
          <FaCheck />
        </IconContext.Provider>
      ) : (
        <></>
      )}
    </li>
  );
};

export default TopicsListItem;
