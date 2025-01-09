import "./TopicsListItem.scss";

const TopicsListItem = ({ channel, name, onClick, userImg, className }) => {
  return (
    <li onClick={onClick} className={className}>
      {channel.avatar ? (
        <img
          className="topics-list-item__img"
          src={channel.avatar}
          alt={channel.name}
        />
      ) : userImg ? (
        <img
          className="topics-list-item__img"
          src={userImg}
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
      <span className="topics-list-item__divider"> / </span>
      <span className="topics-list-item__text">{name}</span>
    </li>
  );
};

export default TopicsListItem;
