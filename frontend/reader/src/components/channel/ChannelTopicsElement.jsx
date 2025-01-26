import { useNavigate } from "react-router";
import TopicsListItem from "../create-topic-items/TopicsListItem";
import ChannelHeading2 from "./ChannelHeading2";
import "./ChannelTopicsElement.scss";

const ChannelTopicsElement = ({
  name,
  topics,
  channel,
  aosEffect,
  topicsFollowed,
}) => {
  const navigate = useNavigate();
  const handleTopicClick = (topic) => {
    navigate(`topic/${topic.topicId}`);
  };
  return (
    <div className="channel-topics-element">
      <ChannelHeading2 name={name} number={topics.length} />
      <ul className="channel-topics-element__topics-wrapper">
        {topics.map((topic) => (
          <TopicsListItem
            aosEffect={aosEffect}
            userImg={channel.avatar}
            onClick={() => handleTopicClick(topic)}
            key={topic.topicId}
            name={topic.name}
            channel={channel}
            followed={
              topicsFollowed &&
              topicsFollowed.some((elem) => elem.topicId === topic.topicId)
                ? true
                : false
            }
            className="topics-list-item topics-list-item_channel-view"
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelTopicsElement;
