import "./TopicsListItem.scss";

const TopicsListItem = ({ channel, name, onClick }) => {
  return (
    <li onClick={onClick} className="topics-list-item">
      {channel.avatar ? (
        <img src={channel.avatar} alt={channel.name} />
      ) : (
        <div
          className="channel-list-item__logo channel-list-item__logo-placeholder"
          style={{ backgroundColor: channel.logoPlaceholderColor }}
        >
          <span>{channel.name.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <span className="topics-list-item__divider"> / </span>
      <span className="topics-list-item__text">{name}</span>
    </li>
  );
};

export default TopicsListItem;
