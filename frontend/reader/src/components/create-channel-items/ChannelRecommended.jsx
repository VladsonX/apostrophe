import { NavLink } from "react-router";
import "./ChannelRecommended.scss";
import { serverURL } from "../../server";

const ChannelRecommended = ({ channel, aosEffect }) => {
  const logoUrl = channel.avatar
    ? `${serverURL}/api/v1/media/${channel.avatar}`
    : null;
  return (
    <NavLink 
    aria-label={channel.name}
      data-aos={aosEffect}
      className="channel-recommended__navlink"
      to={`/channel/${channel.channelId}`}
    >
      <div data-aos={aosEffect} className="channel-recommended__card">
        <div className="channel-recommended__header">
          <div className="channel-recommended__header-wrapper">
            {channel.avatar ? (
              <img
                src={logoUrl}
                alt={channel.name}
                className="channel-recommended__logo"
              />
            ) : (
              <div
                style={{ backgroundColor: channel.logoPlaceholderColor }}
                className="channel-recommended__logo-placeholder"
              >
                <span>{channel?.name?.charAt(0).toUpperCase()}</span>
              </div>
            )}

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
