import { useNavigate } from "react-router";
import TopicsListItem from "../create-topic-items/TopicsListItem";
import ChannelHeading2 from "./ChannelHeading2";
import "./ChannelTopicsElement.scss";

const ChannelTopicsElement = ({ name, topics, channel, aosEffect }) => {
  const navigate = useNavigate();
  const handleTopicClick = (topic) => {
    navigate(`topic/${topic.topicId}`);
  };
  return (
    <div data-aos={aosEffect} className="channel-topics-element">
      <ChannelHeading2 name={name} />
      <ul className="channel-topics-element__topics-wrapper">
        {topics.map((topic) => (
          <TopicsListItem
            onClick={() => handleTopicClick(topic)}
            key={topic.topicId}
            name={topic.name}
            channel={channel}
            className="topics-list-item_channel-view"
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelTopicsElement;
