import "./CreateChannelTopics.scss";
import ChannelsList from "../channel-list/ChannelsList";
import ChannelListItem from '../channel-list/ChannelListItem'
import TopicCard from "./TopicCard";
import CreateChannelListItem from "./CreateChannelListItem"

const CreateChannelTopics = ({ name, type, topics }) => {
  return (
    <div className="create-channel-topics__wrapper">
      <ChannelsList type="small">
        {topics && topics.map(topic => <ChannelListItem type='topic' key={topic.topicId} channel={topic}/>)}
        <CreateChannelListItem type='topic'/>
      </ChannelsList>
      <TopicCard />
    </div>
  );
};

export default CreateChannelTopics;
