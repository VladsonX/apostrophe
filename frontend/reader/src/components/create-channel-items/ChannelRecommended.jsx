import { NavLink } from "react-router";
import "./ChannelRecommended.scss";

const ChannelRecommended = ({ channel }) => {
  return (
    <NavLink className='channel-recommended__navlink' to={'channel'}>
      <div className="channel-recommended__card">
        <div className="channel-recommended__header">
          <div className="channel-recommended__header-wrapper">
            <img
              src={channel.avatar}
              alt={channel.name}
              className="channel-recommended__logo"
            />
            <span className="channel-recommended__name">{channel.name}</span>
          </div>
        </div>
        <div className="channel-recommended__description">
          {channel.description}
        </div>
      </div>
    </NavLink>
  );
};

export default ChannelRecommended;
