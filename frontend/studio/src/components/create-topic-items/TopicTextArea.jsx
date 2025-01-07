import "./TopicTextArea.scss";
import { useState } from "react";

const TopicTextArea = ({ maxcharCount, topicDescription }) => {
  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setValue(textarea.value);
  };
  const [charCount, setCharCount] = useState(topicDescription.length);
  const [value, setValue] = useState(topicDescription);
  return (
    <div className="topic-input__wrapper">
      <textarea
        onChange={(e) => setCharCount(e.target.value.length)}
        onInput={(e) => {
          handleInput(e);
          setValue(e.target.value)
        }}
        placeholder="I really like this topic of my lovely channel"
        className="topic-text-area__textarea"
        value={value}
        name=""
        id=""
      ></textarea>
      <span className="topic-input__counter">
        {charCount ? charCount : 0}/{maxcharCount}
      </span>
    </div>
  );
};

export default TopicTextArea;
