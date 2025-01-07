import CreateTopicElement from "./CreateTopicElement";
import "./TopicCard.scss";
import TopicInput from "./TopicInput";
import TopicTextArea from "./TopicTextArea";
import SmallSubmitButton from "../main-components/SmallSubmitButton";

const TopicCard = ({ topic }) => {
  return (
    <div className="topic-card">
      <CreateTopicElement title="Topic name">
        <TopicInput topicName={topic ? topic.name : ""} maxcharCount="64" />
      </CreateTopicElement>
      <CreateTopicElement title="Topic description">
        <TopicTextArea
          topicDescription={topic ? topic.description : ""}
          maxcharCount="500"
        />
      </CreateTopicElement>
      <div className="topic-card__buttons-wrapper">
        <SmallSubmitButton text="Discard" color="red" />
        <SmallSubmitButton text="Save" />
      </div>
    </div>
  );
};

export default TopicCard;
