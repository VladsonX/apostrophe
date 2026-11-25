/* eslint-disable react-refresh/only-export-components -- context, hooks and helpers live together */
import { createContext, useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const EMPTY_CHANNEL = {
  name: "",
  description: "",
  avatar: null,
  topicsEnabled: false,
  topics: [],
};

// New topics get a temporary id for React keys; `isNew` tells us not to send it to the API.
export const createDraftTopic = () => ({
  topicId: uuidv4(),
  isNew: true,
  name: "New topic",
  description: "Description",
});

export const toApiTopic = ({ topicId, isNew, name, description }) =>
  isNew ? { name, description } : { topicId, name, description };

export const useChannelFormState = (initialChannel = EMPTY_CHANNEL) => {
  const [channel, setChannel] = useState(initialChannel);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const setField = useCallback(
    (field, value) => setChannel((current) => ({ ...current, [field]: value })),
    [],
  );

  const addTopic = useCallback(() => {
    const topic = createDraftTopic();
    setChannel((current) => ({ ...current, topics: [...current.topics, topic] }));
    setSelectedTopicId(topic.topicId);
  }, []);

  const updateTopic = useCallback(
    (updated) =>
      setChannel((current) => ({
        ...current,
        topics: current.topics.map((topic) =>
          topic.topicId === updated.topicId ? { ...topic, ...updated } : topic,
        ),
      })),
    [],
  );

  const setTopicMode = useCallback((enabled) => {
    const firstTopic = createDraftTopic();
    setChannel((current) => ({
      ...current,
      topicsEnabled: enabled,
      topics: enabled ? [firstTopic] : [],
    }));
    setSelectedTopicId(enabled ? firstTopic.topicId : null);
  }, []);

  return {
    channel,
    setChannel,
    setField,
    addTopic,
    updateTopic,
    setTopicMode,
    selectedTopicId,
    setSelectedTopicId,
  };
};

const ChannelFormContext = createContext(null);

// `form` is the object returned by useChannelFormState in the page.
export const ChannelFormProvider = ({ form, children }) => (
  <ChannelFormContext.Provider value={form}>{children}</ChannelFormContext.Provider>
);

export const useChannelForm = () => {
  const context = useContext(ChannelFormContext);
  if (!context) throw new Error("useChannelForm must be used inside <ChannelFormProvider>");
  return context;
};
