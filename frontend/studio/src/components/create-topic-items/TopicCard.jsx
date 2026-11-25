import CreateTopicElement from "./CreateTopicElement";
import "./TopicCard.scss";
import TopicInput from "./TopicInput";
import TopicTextArea from "./TopicTextArea";
import SmallSubmitButton from "../main-components/SmallSubmitButton";
import { useEffect, useState } from "react";

const TopicCard = ({ topic, updateTopic }) => {
  const [updatedTopicName, setUpdatedTopicName] = useState(topic.name);
  const [updatedTopicDescr, setUpdatedTopicDescr] = useState(topic.description);

  useEffect(() => {
    setUpdatedTopicName(topic.name || "New topic");
    setUpdatedTopicDescr(topic.description || "Description");
  }, [topic])

  const handleSaveButtonClick = () => {
    const newTopic = {
      topicId: topic.topicId,
      name: updatedTopicName,
      description: updatedTopicDescr,
    };
    updateTopic(newTopic);
    console.log("Topic card:", newTopic);
  };

  return (
    <div className="topic-card">
      <CreateTopicElement title="Topic name">
        <TopicInput
          updateTopicName={setUpdatedTopicName}
          topicName={updatedTopicName}
          maxcharCount="64"
        />
      </CreateTopicElement>
      <CreateTopicElement title="Topic description">
        <TopicTextArea
          updateTopicDescription={setUpdatedTopicDescr}
          topicDescription={updatedTopicDescr}
          maxcharCount="500"
        />
      </CreateTopicElement>
      <div className="topic-card__buttons-wrapper">
        {/* <SmallSubmitButton text="Discard" color="red" /> */}
        <SmallSubmitButton onClick={handleSaveButtonClick} text="Save" />
      </div>
    </div>
  );
};

export default TopicCard;
