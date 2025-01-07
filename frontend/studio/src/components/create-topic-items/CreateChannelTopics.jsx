import { useState } from "react";
import "./CreateChannelTopics.scss";
import TopicCard from "./TopicCard";
import TopicsList from "./TopicsList";
import TopicsListItem from "./TopicsListItem";

const CreateChannelTopics = ({ channel }) => {
  const [topicChosen, setTopicChosen] = useState();
  const handleTopicClick = (topic) => {
    setTopicChosen(topic);
    console.log(topicChosen);
  };
  return (
    <div className="create-channel-topics__wrapper">
      <TopicsList>
        {channel.topics &&
          channel.topics.map((topic) => (
            <TopicsListItem
              onClick={() => handleTopicClick(topic)}
              key={topic.name}
              name={topic.name}
              channel={channel}
            />
          ))}
      </TopicsList>
      <div className="topics-card-wrapper">
        {topicChosen ? ( <TopicCard topic={topicChosen} />) : (<div></div>)}
       
      </div>
    </div>
  );
};

export default CreateChannelTopics;
