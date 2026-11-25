import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";
import ErrorMessage from "../components/main-components/ErrorMessage";
import ChannelForm from "../components/create-channel-items/ChannelForm";
import {
  toApiTopic,
  useChannelFormState,
} from "../components/create-channel-items/ChannelFormContext";
import { channelsApi } from "../api";
import { useApi } from "../hooks/useApi";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import "./CreateChannelPage.scss";

const loadChannel = async (channelId) => {
  const channel = await channelsApi.get(channelId);
  enrichChannelsWithLogoPlaceholderBackground([channel]);
  return channel;
};

const EditChannelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: saved, loading, error } = useApi(() => loadChannel(id), [id]);
  const form = useChannelFormState();
  const { channel, setChannel, selectedTopicId } = form;
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (saved) setChannel(saved);
  }, [saved, setChannel]);

  const isEnablingTopics = saved && !saved.topicsEnabled && channel.topicsEnabled;

  const save = async () => {
    setSaveError(null);
    try {
      let topics = channel.topics;

      if (isEnablingTopics) {
        // Existing articles move to the selected topic, which the API creates first.
        const target = topics.find((topic) => topic.topicId === selectedTopicId);
        if (!target) throw new Error("Choose the topic your existing articles should move to.");
        await channelsApi.enableTopics(saved.channelId, toApiTopic(target));
        topics = topics.filter((topic) => topic !== target);
      }

      await channelsApi.update(saved.channelId, {
        name: channel.name,
        description: channel.description,
        avatar: channel.avatar,
        topics: topics.map(toApiTopic),
      });
      navigate(`/channel/${saved.channelId}`);
    } catch (err) {
      setSaveError(err);
    }
  };

  return (
    <MainSection>
      <TopNavigationBar
        button={<SmallSubmitButton onClick={save} text="Save" position="absolute" />}
        channel={saved}
      />
      <MainContainer>
        <ErrorMessage error={error ?? saveError} />
        {loading ? (
          <Loader />
        ) : (
          saved && (
            <ChannelForm
              form={form}
              canToggleTopics={!saved.topicsEnabled}
              migrationHint={isEnablingTopics}
            />
          )
        )}
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default EditChannelPage;
