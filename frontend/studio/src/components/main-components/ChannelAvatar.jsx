import { CiImageOn } from "react-icons/ci";
import { IconContext } from "react-icons";
import { mediaUrl } from "../../api/client";

// Channel logo, or a coloured letter placeholder, or an empty image icon.
// Replaces four copies of the same if/else chain.
const ChannelAvatar = ({ channel, imgClassName, size = "small" }) => {
  if (channel?.avatar) {
    return <img className={imgClassName} src={mediaUrl(channel.avatar)} alt={channel.name} />;
  }

  if (channel?.name) {
    return (
      <div
        className={`channel-list-item__logo channel-list-item__logo-placeholder${
          size === "big" ? " channel-list-item__logo-placeholder_big" : ""
        }`}
        style={{ backgroundColor: channel.logoPlaceholderColor }}
      >
        <span>{channel.name.charAt(0).toUpperCase()}</span>
      </div>
    );
  }

  return (
    <div
      className={`create-channel-logo__placeholder${
        size === "small" ? " create-channel-logo__placeholder_small" : ""
      }`}
    >
      <div>
        <IconContext.Provider
          value={{
            size: size === "small" ? "2.5rem" : "4.5rem",
            className: "create-channel-logo__add-icon",
          }}
        >
          <CiImageOn />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default ChannelAvatar;
