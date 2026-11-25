import { useState } from "react";
import CreateTopicElement from "./CreateTopicElement";
import SmallSubmitButton from "../main-components/SmallSubmitButton";
import CharCountField from "../main-components/CharCountField";
import "./TopicCard.scss";
import "./TopicInput.scss";
import "./TopicTextArea.scss";

// Keeps a local draft so changes apply only after "Save".
const TopicCard = ({ topic, onSave }) => {
  const [name, setName] = useState(topic.name);
  const [description, setDescription] = useState(topic.description);

  return (
    <div className="topic-card">
      <CreateTopicElement title="Topic name">
        <CharCountField
          value={name}
          onChange={setName}
          maxCharCount={64}
          placeholder="Topic of my lovely channel"
          className="topic-input"
          counterClassName="topic-input__counter"
          wrapperClassName="topic-input__wrapper"
          required
        />
      </CreateTopicElement>
      <CreateTopicElement title="Topic description">
        <CharCountField
          multiline
          autoGrow
          value={description}
          onChange={setDescription}
          maxCharCount={500}
          placeholder="I really like this topic of my lovely channel"
          className="topic-text-area__textarea"
          counterClassName="topic-input__counter"
          wrapperClassName="topic-input__wrapper"
        />
      </CreateTopicElement>
      <div className="topic-card__buttons-wrapper">
        <SmallSubmitButton
          onClick={() => onSave({ topicId: topic.topicId, name, description })}
          text="Save"
        />
      </div>
    </div>
  );
};

export default TopicCard;
