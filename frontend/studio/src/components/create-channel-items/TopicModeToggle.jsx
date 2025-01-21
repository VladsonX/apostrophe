import { useState } from "react";
import "./TopicModeToggle.scss";
import { v4 as uuidv4 } from 'uuid';


const TopicModeToggle = ({ setTopicMode, topics }) => {
  const [enableTopicMode, setEnableTopicMode] = useState(false);
  const toggleTopicMode = () => {
    const topicMode = enableTopicMode;
    setEnableTopicMode(!topicMode);
    setTopicMode(!topicMode);
    const newTopic = {
      topicId: uuidv4(),
      name: "New topic",
      description: "Description",
    };
    !topicMode ? topics([newTopic]) : (topics([]));
  };
  return (
    <button
      onClick={toggleTopicMode}
      className={
        enableTopicMode
          ? "topic-mode-toggle topic-mode-toggle_active"
          : "topic-mode-toggle"
      }
    >
      <div className="topic-mode-toggle__toggler"></div>
    </button>
  );
};

export default TopicModeToggle;
