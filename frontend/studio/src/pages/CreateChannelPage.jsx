import { useState } from "react";
import { NavLink } from "react-router";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import Footer from "../components/main-components/Footer";
import ErrorMessage from "../components/main-components/ErrorMessage";
import ChannelForm from "../components/create-channel-items/ChannelForm";
import {
  toApiTopic,
  useChannelFormState,
} from "../components/create-channel-items/ChannelFormContext";
import { channelsApi } from "../api";
import "./CreateChannelPage.scss";

const CreateChannelPage = () => {
  const form = useChannelFormState();
  const { channel } = form;
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(false);

  const save = async () => {
    setError(null);
    try {
      await channelsApi.create({
        name: channel.name,
        description: channel.description,
        avatar: channel.avatar,
        topicsEnabled: channel.topicsEnabled,
        topics: channel.topics.map(toApiTopic),
      });
      setCreated(true);
    } catch (err) {
      setError(err);
    }
  };

  if (created) {
    return (
      <MainSection>
        <div className="create-channel-page__confirmation">
          <p className="create-channel-page__confirmation-text">
            <span className="create-channel-page__confirmation-text_big">Congratulations!</span>
          </p>
          <p className="create-channel-page__confirmation-text">
            Your channel called{" "}
            <span className="create-channel-page__confirmation-text_color">{channel.name}</span> has
            just been created.
          </p>
          <p className="create-channel-page__confirmation-text">
            Go to{" "}
            <NavLink to="/" className="create-channel-page__confirmation-text_gradient">
              Main Page
            </NavLink>
          </p>
        </div>
      </MainSection>
    );
  }

  return (
    <MainSection>
      <TopNavigationBar
        button={<SmallSubmitButton onClick={save} text="Save" position="absolute" />}
        name="Create new channel: "
      />
      <MainContainer>
        <ErrorMessage error={error} />
        <ChannelForm form={form} />
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default CreateChannelPage;
