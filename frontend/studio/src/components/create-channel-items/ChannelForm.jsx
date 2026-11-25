import CreateChannelElement from "./CreateChannelElement";
import CreateChannelLogo from "./CreateChannelLogo";
import CreateChannelInput from "./CreateChannelInput";
import TopicModeToggle from "./TopicModeToggle";
import CreateChannelTopics from "../create-topic-items/CreateChannelTopics";
import { ChannelFormProvider } from "./ChannelFormContext";

const TopicModeDescription = () => (
  <p className="topic-mode-description">
    Choose if you want to enable <span className="topic-mode-description_mode">Topic Mode</span> for
    your channel. Once <span className="topic-mode-description_mode">Topic Mode</span> is enabled -{" "}
    <span className="topic-mode-description_bold">
      at least one topic should be created. All the articles you create further should be added to
      certain topic.
    </span>
  </p>
);

// Shared by "create channel" and "edit channel".
// `canToggleTopics` is false once a saved channel already uses topics (the API can't turn it off).
// `migrationHint` explains which topic existing articles will move to when topics get enabled.
const ChannelForm = ({ form, canToggleTopics = true, migrationHint = false }) => {
  const { channel, setField } = form;

  return (
    <ChannelFormProvider form={form}>
      <CreateChannelElement name="Channel Logo">
        <CreateChannelLogo />
      </CreateChannelElement>
      <CreateChannelElement name="Channel Name">
        <CreateChannelInput
          value={channel.name}
          onChange={(value) => setField("name", value)}
          placeholder="My Lovely Channel"
          maxCharCount={64}
        />
      </CreateChannelElement>
      <CreateChannelElement name="Channel Description">
        <CreateChannelInput
          multiline
          value={channel.description}
          onChange={(value) => setField("description", value)}
          placeholder="I really love my lovely channel"
          maxCharCount={500}
        />
      </CreateChannelElement>
      {canToggleTopics && (
        <CreateChannelElement name="Topic Mode">
          <div className="topic-mode-wrapper">
            <TopicModeToggle />
            <TopicModeDescription />
          </div>
        </CreateChannelElement>
      )}
      {channel.topicsEnabled && (
        <CreateChannelElement name="Channel Topics" number={channel.topics.length}>
          {migrationHint && (
            <p className="topic-mode-description topic-mode-description_topics-mode">
              Please click on the{" "}
              <span className="topic-mode-description_mode">
                topic you want to transfer all your articles to
              </span>{" "}
              before submitting this form
            </p>
          )}
          <CreateChannelTopics />
        </CreateChannelElement>
      )}
    </ChannelFormProvider>
  );
};

export default ChannelForm;
