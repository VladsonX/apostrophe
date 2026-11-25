import TopicCard from "./TopicCard";
import TopicsList from "./TopicsList";
import TopicsListItem from "./TopicsListItem";
import { useChannelForm } from "../create-channel-items/ChannelFormContext";
import "./CreateChannelTopics.scss";

const CreateChannelTopics = () => {
  const { channel, addTopic, updateTopic, selectedTopicId, setSelectedTopicId } = useChannelForm();
  const selectedTopic = channel.topics.find((topic) => topic.topicId === selectedTopicId);

  return (
    <div className="create-channel-topics__wrapper">
      <TopicsList>
        {channel.topics.map((topic) => (
          <TopicsListItem
            key={topic.topicId}
            channel={channel}
            name={topic.name}
            active={topic.topicId === selectedTopicId}
            onClick={() => setSelectedTopicId(topic.topicId)}
          />
        ))}
        <TopicsListItem channel={channel} name="Add new topic +" isAddButton onClick={addTopic} />
      </TopicsList>
      <div className="topics-card-wrapper">
        {selectedTopic ? (
          // key resets the card's draft when another topic is selected
          <TopicCard key={selectedTopic.topicId} topic={selectedTopic} onSave={updateTopic} />
        ) : (
          <div className="topic-card__placeholder">
            <p className="topic-card__placeholder-text">Choose your topic or create new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateChannelTopics;
