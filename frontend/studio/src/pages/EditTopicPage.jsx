import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import MainContainer from "../components/main-components/MainContainer";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import CreateChannelInput from "../components/create-channel-items/CreateChannelInput";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { channelsApi } from "../api";
import { useApi } from "../hooks/useApi";
import "./EditTopicPage.scss";

const EditTopicPage = () => {
  const { channelId, topicId } = useParams();
  const navigate = useNavigate();
  const { data: channel, loading, error } = useApi(() => channelsApi.get(channelId), [channelId]);
  const topic = channel?.topics.find((t) => t.topicId === topicId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (topic) {
      setName(topic.name);
      setDescription(topic.description);
    }
  }, [topic]);

  const save = async () => {
    setSaveError(null);
    try {
      await channelsApi.update(channelId, { topics: [{ topicId, name, description }] });
      navigate(`/channel/${channelId}/topic/${topicId}`);
    } catch (err) {
      setSaveError(err);
    }
  };

  return (
    <MainSection>
      <TopNavigationBar
        button={<SmallSubmitButton onClick={save} text="Save" position="absolute" />}
        channel={channel}
        topic={topic}
      />
      <MainContainer>
        <ErrorMessage error={error ?? saveError} />
        {loading ? (
          <Loader />
        ) : (
          <>
            <CreateChannelElement name="Topic Name">
              <CreateChannelInput
                value={name}
                onChange={setName}
                placeholder="My Lovely Topic"
                maxCharCount={64}
              />
            </CreateChannelElement>
            <CreateChannelElement name="Topic Description">
              <CreateChannelInput
                multiline
                value={description}
                onChange={setDescription}
                placeholder="I really love my lovely topic"
                maxCharCount={500}
              />
            </CreateChannelElement>
          </>
        )}
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default EditTopicPage;
