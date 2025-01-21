import Divider from "../main-components/Divider";
import "./ChannelTitleElement.scss";
import { serverURL } from "../../server";

const ChannelTitleElement = ({ channel, topic }) => {
  const imageUrl = channel.avatar ? `${serverURL}/api/v1/media/${channel.avatar}` : null;
  return (
    <section className="channel-title-element">
      <div className="channel-title-element__wrapper channel-title-element__wrapper_small">
        {channel.avatar ? (
          <img
            className="channel-title-element__img"
            src={imageUrl}
            alt={channel.name}
          />
        ) : (
          <div
            className="channel-list-item__logo channel-list-item__logo-placeholder channel-list-item__logo-placeholder_xxl"
            style={{ backgroundColor: channel.logoPlaceholderColor }}
          >
            <span>{channel?.name?.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
      <div className="channel-title-element__wrapper channel-title-element__wrapper_large">
        <h1 className="channel-title-element__title">{channel.name}</h1>
        {topic? (<span className="channel-title-element__subtitle">{topic.name}</span>) : (<></>)}
        
        <Divider />
      </div>
    </section>
  );
};

export default ChannelTitleElement;
