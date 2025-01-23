import { useState } from "react";
import "./CreateChannelTopics.scss";
import TopicCard from "./TopicCard";
import TopicsList from "./TopicsList";
import TopicsListItem from "./TopicsListItem";
import AddTopicListItem from "./AddTopicListItem";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { serverURL } from "../../server";

const CreateChannelTopics = ({ channel, customImg, updateTopics, newTopics, setTopicClicked}) => {
  console.log(customImg);
  const [topicChosen, setTopicChosen] = useState();
  const [updatedTopics, setUpdatedTopics] = useState(newTopics);
  useEffect(() => {
    if (channel && channel.topicsEnabled) {
      setUpdatedTopics(channel.topics);
      console.log("Topics loaded:", channel.topics);
    }
  }, [channel]);

  const handleTopicChanges = (updatedTopic) => {
    const newTopics = updatedTopics.map((topic) =>
      topic.topicId === updatedTopic.topicId ? { ...updatedTopic } : { ...topic },
    
    );
    setUpdatedTopics(newTopics);
    console.log("Create Channel Topics: updated topics:", newTopics);
    updateTopics(newTopics);
  };

  const handleAddNewTopicClick = () => {
    const newTopic = {
      topicId: uuidv4(),
      name: "New topic",
      description: "Description",
    };
    console.log("Created new topic: ", newTopic);
    setTopicChosen(newTopic);
    console.log("Topic chosen: ", newTopic);
    setUpdatedTopics([...updatedTopics, newTopic]);
    console.log('Updated topics: ', updatedTopics);
  };
  const handleTopicClick = (topic) => {
    setTopicChosen(topic);
    setTopicClicked && setTopicClicked(topic);
    console.log('Topic chosen: ', topic);
  };
  return (
    <div className="create-channel-topics__wrapper">
      <TopicsList>
        {updatedTopics &&
          updatedTopics.map((topic) => (
            <TopicsListItem
              userImg={customImg}
              onClick={() => handleTopicClick(topic)}
              key={topic.topicId}
              name={topic.name}
              channel={channel}
              className={`topics-list-item ${topicChosen?.topicId === topic.topicId ? "topics-list-item_active" : ""}`}
            />
          ))}
        <AddTopicListItem
          userImg={customImg}
          onClick={() => handleAddNewTopicClick()}
          key="AddNewTopic"
          name="Add new topic +"
          channel={channel}
        />
      </TopicsList>
      <div className="topics-card-wrapper">
        {topicChosen ? (
          <TopicCard
            updateTopic={handleTopicChanges}
            topic={topicChosen}
            key={topicChosen.topicId}
          />
        ) : (
          <div className="topic-card__placeholder">
            <p className="topic-card__placeholder-text">
              Choose your topic or create new one
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateChannelTopics;
