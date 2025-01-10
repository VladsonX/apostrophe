import Divider from "../main-components/Divider";
import "./ChannelTitleElement.scss";

const ChannelTitleElement = ({ channel }) => {
  return (
    <section className="channel-title-element">
      <div className="channel-title-element__wrapper channel-title-element__wrapper_small">
        {channel.avatar ? (
          <img
            className="channel-title-element__img"
            src={channel.avatar}
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
        <h1 className="channel-title-element__title">The British Broadcasting Corporation (BBC)</h1>
        <span className="channel-title-element__subtitle">News</span>
        <Divider />
      </div>
    </section>
  );
};

export default ChannelTitleElement;
