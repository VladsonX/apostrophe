import { useChannelForm } from "./ChannelFormContext";
import "./TopicModeToggle.scss";

const TopicModeToggle = () => {
  const { channel, setTopicMode } = useChannelForm();
  const enabled = channel.topicsEnabled;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="Topic mode"
      onClick={() => setTopicMode(!enabled)}
      className={enabled ? "topic-mode-toggle topic-mode-toggle_active" : "topic-mode-toggle"}
    >
      <div
        className={
          enabled
            ? "topic-mode-toggle__toggler topic-mode-toggle__toggler_active"
            : "topic-mode-toggle__toggler"
        }
      ></div>
    </button>
  );
};

export default TopicModeToggle;
