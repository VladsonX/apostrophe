import "./ChannelListItem.scss";
import { MdModeEdit } from "react-icons/md";
import { IconContext } from "react-icons";
import { NavLink } from "react-router";
import { serverURL } from "../server";

const ChannelListItem = ({ name, logo, path }) => {
  return (
    <li className="channel-list-item">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "channel-list-item__link active"
            : "channel-list-item__link"
        }
        key={name}
        to={path}
      >
        <img className="channel-list-item__logo" src={serverURL + "/api/v1/media/" +  logo} alt={name} />
        <span className="channel-list-item__name">{name}</span>
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
