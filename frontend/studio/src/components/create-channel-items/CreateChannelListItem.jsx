import { NavLink } from "react-router";
import { FaPlus } from "react-icons/fa6";
import { IconContext } from "react-icons";

import "./CreateChannelListItem.scss";

const CreateChannelListItem = ({ type }) => {
  return (
    <li
      className={
        type === "topic"
          ? "channelListItem channelListItem_create"
          : "channelListItem channelListItem_create"
      }
    >
      {type !== "topic" ? (
        <NavLink
          to="channel/createchannel"
          className={({ isActive }) =>
            isActive
              ? "channel-list-item_create-link active"
              : "channel-list-item_create-link"
          }
        >
          <IconContext.Provider
            value={{
              color: "white",
              size: "1.25rem",
              className: "channel-list-item_create-add",
            }}
          >
            <FaPlus />
          </IconContext.Provider>
          <span className="channel-list-item_create-text">
            Create new channel
          </span>
        </NavLink>
      ) : (
        <>
          <IconContext.Provider
            value={{
              color: "white",
              size: "1rem",
              className: "channel-list-item_create-add channel-list-item_create_topic-add",
            }}
          >
            <FaPlus />
          </IconContext.Provider>
          <span className="channel-list-item_create-text channel-list-item_create_topic-text">
            Create new channel
          </span>
        </>
      )}
    </li>
  );
};

export default CreateChannelListItem;
