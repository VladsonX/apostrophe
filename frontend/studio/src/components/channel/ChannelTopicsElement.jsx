import TopicsListItem from "../create-topic-items/TopicsListItem";
import ChannelHeading2 from "./ChannelHeading2";
import "./ChannelTopicsElement.scss";
import Topic from "./Topic";

const ChannelTopicsElement = ({ name, topics, channel }) => {
  return (
    <div className="channel-topics-element">
      <ChannelHeading2 name={name} />
      <ul className="channel-topics-element__topics-wrapper">
        {topics.map((topic) => (
          <TopicsListItem 
          userImg={channel.avatar}
          // onClick={() => handleTopicClick(topic)}
          key={topic.topicId}
          name={topic.name}
          channel={channel}
          // className={`topics-list-item ${topicChosen?.topicId === topic.topicId ? "topics-list-item_active" : ""}`}
          className='topics-list-item topics-list-item_channel-view'
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelTopicsElement;
