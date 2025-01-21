import "./TopicsListItem.scss";
import { CiImageOn } from "react-icons/ci";
import { IconContext } from "react-icons";
import { serverURL } from "../../server";

const TopicsListItem = ({ channel, name, onClick, userImg, className }) => {
  const imageUrl = `${serverURL}/api/v1/media/${userImg}`
  console.log('Topic List Item IMG: ',userImg)
  return (
    <li onClick={onClick} className={className}>
      {userImg ? (
        <img
          className="topics-list-item__img"
          src={imageUrl}
          alt={channel.name}
        />
      ) : channel.name ? (
        <div
          className="channel-list-item__logo channel-list-item__logo-placeholder"
          style={{ backgroundColor: channel.logoPlaceholderColor }}
        >
          <span>{channel.name.charAt(0).toUpperCase()}</span>
        </div>
      ) : (<div className="create-channel-logo__placeholder create-channel-logo__placeholder_small">
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
              </div>)}
      <span className="topics-list-item__divider"> / </span>
      <span className="topics-list-item__text">{name}</span>
    </li>
  );
};

export default TopicsListItem;
