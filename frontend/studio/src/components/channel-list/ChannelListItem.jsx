import "./ChannelListItem.scss";
import { MdModeEdit } from "react-icons/md";
import { IconContext } from "react-icons";
import { NavLink } from "react-router";
import { serverURL } from "../../server";

const ChannelListItem = ({ channel }) => {
  return (
    <li className="channel-list-item">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "channel-list-item__link active"
            : "channel-list-item__link"
        }
        key={channel.name}
        to={"channel/createchannel/" + channel.channelId}
      >
        {channel.avatar ? (
          <img
            className="channel-list-item__logo"
            src={serverURL + "/api/v1/media/" + channel.avatar}
            alt={channel.name}
          />
        ) : (
          <div
            className="channel-list-item__logo channel-list-item__logo-placeholder"
            style={{ backgroundColor: channel.logoPlaceholderColor }}
          >
            <span>{channel.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <span className="channel-list-item__name">{channel.name}</span>
        <IconContext.Provider
          value={{
            color: "white",
            size: "1.25rem",
            className: "channel-list-item__edit",
          }}
        >
          <MdModeEdit />
        </IconContext.Provider>
      </NavLink>
    </li>
  );
};

export default ChannelListItem;
