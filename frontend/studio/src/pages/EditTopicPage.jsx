import "./EditTopicPage.scss";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { serverURL } from "../server";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { FaHome } from "react-icons/fa";
import SmalSubmitButton from "../components/main-components/SmallSubmitButton";
import MainContainer from "../components/main-components/MainContainer";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import ChannelSettingsInput from "../components/create-channel-items/CreateChannelInput";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";

const EditTopicPage = () => {
  const [channel, setChannel] = useState({});
  const [topic, setTopic] = useState({});
  const [topicName, setTopicName] = useState();
  const [topicDescr, setTopicDescr] = useState();
  const { channelId, topicId } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmitButton = async () => {
    const token = getCurrentJwtToken();
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      navigate("welcome");
      return;
    }

    const topicUpdated = {
      topicId: topicId,
      name: topicName,
      description: topicDescr,
    };
    const topicsPatch = {
      topics: [
        topicUpdated
      ]
    }
    console.log(topicsPatch);
    try {
      const response = await fetch(
        `${serverURL}/api/v1/channels/${channelId}`,
        {
          method: "PATCH",
          body: JSON.stringify(topicsPatch),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch channels");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchChannels = async () => {
      const token = getCurrentJwtToken();
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("welcome");
        return;
      }

      try {
        const response = await fetch(
          `${serverURL}/api/v1/channels/${channelId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch channels");
        }
        const channel = await response.json();
        setChannel(channel);
        const topicChosen = channel.topics.find(
          (element) => element.topicId === topicId
        );
        console.log("Topic Chosen: " + topicChosen);
        setTopic(topicChosen);
        setTopicName(topicChosen.name)
        setTopicDescr(topicChosen.description)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, [channelId, topicId, navigate]);

  return (
    <MainSection>
      <TopNavigationBar
        button={
          <SmalSubmitButton
            onClick={handleSubmitButton}
            text="Save"
            position="absolute"
          />
        }
        channel={channel}
        topic={topic}
      />
      <MainContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
            <CreateChannelElement name="Topic Name">
              <ChannelSettingsInput
                name={setTopicName}
                descr={setTopicDescr}
                key={topic.name}
                channel={topic}
                type="name"
                placeholder="My Lovely Topic"
                maxCharCount="64"
              />
            </CreateChannelElement>
            <CreateChannelElement name="Topic Description">
              <ChannelSettingsInput
                name={setTopicName}
                descr={setTopicDescr}
                key={channel.name}
                channel={topic}
                type="description"
                placeholder="I really love my lovely topic"
                maxCharCount="500"
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
