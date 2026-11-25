import ChannelAvatar from "../main-components/ChannelAvatar";
import "./TopicsListItem.scss";

// `channel` is only used for the avatar (no separate `userImg` prop any more).
const TopicsListItem = ({
  channel,
  name,
  onClick,
  active = false,
  isAddButton = false,
  className = "",
}) => {
  return (
    <li
      onClick={onClick}
      className={`topics-list-item${active ? " topics-list-item_active" : ""} ${className}`}
    >
      <ChannelAvatar channel={channel} imgClassName="topics-list-item__img" />
      <span className="topics-list-item__divider"> / </span>
      <span className={isAddButton ? "topics-list-item__text_add" : "topics-list-item__text"}>
        {name}
      </span>
    </li>
  );
};

export default TopicsListItem;
