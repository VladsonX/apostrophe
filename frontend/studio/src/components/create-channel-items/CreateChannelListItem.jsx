import { NavLink } from "react-router";
import { FaPlus } from "react-icons/fa6";
import { IconContext } from "react-icons";

import "./CreateChannelListItem.scss";

const CreateChannelListItem = () => {
  return (
    <li className="channelListItem channelListItem_create">
      <NavLink
        to="createchannel"
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
        <span className="channel-list-item_create-text">Create new channel</span>
      </NavLink>
    </li>
  );
};

export default CreateChannelListItem;
