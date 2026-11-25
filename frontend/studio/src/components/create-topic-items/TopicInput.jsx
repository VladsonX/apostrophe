import "./TopicInput.scss";
import { useState } from "react";

const TopicInput = ({ maxcharCount, topicName, updateTopicName }) => {
  const [charCount, setCharCount] = useState(topicName.length);
  const [value, setValue] = useState(topicName);
  return (
    <div className="topic-input__wrapper">
      <input
        onInput={(e) => {
          setValue(e.target.value);
          updateTopicName(e.target.value);
        }}
        value={value}
        placeholder="Topic of my lovely channel"
        maxLength={maxcharCount}
        onChange={(e) => setCharCount(e.target.value.length)}
        className="topic-input"
        type="text"
        required
      />
      <span className="topic-input__counter">
        {charCount ? charCount : 0}/{maxcharCount}
      </span>
    </div>
  );
};

export default TopicInput;
