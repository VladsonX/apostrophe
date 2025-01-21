import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import "./TopicPage.scss";
import SmalSubmitButton from "../components/main-components/SmallSubmitButton";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { serverURL } from "../server";
import { useParams } from "react-router";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import MainContainer from "../components/main-components/MainContainer";
import ChannelTitleElement from "../components/channel/ChannelTitleElement";
import ChannelLatestArticles from "../components/channel/ChannelLatestArticles";
import Loader from '../components/main-components/Loader'

const ChannelPage = () => {
  const { channelId, topicId } = useParams();
  const [channel, setChannel] = useState({});
  const [topic, setTopic] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log("Channel id: ", channelId);
  console.log("Topic id: ", topicId);
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
        const responseChannel = await fetch(
          `${serverURL}/api/v1/channels/${channelId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!responseChannel.ok) {
          throw new Error("Failed to fetch channels");
        }

        const channel = await responseChannel.json();
        enrichChannelsWithLogoPlaceholderBackground([channel]);
        setChannel(channel);
        console.log(channel);
        const topicFound = channel.topics.find(
          (element) => element.topicId === topicId
        );
        setTopic(topicFound);
        console.log(topic);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, [topicId, channelId, navigate]);

  const handleSubmitButton = () => {
    navigate(`edit`);
  };
  return (
    <MainSection>
      <TopNavigationBar
        button={
          <SmalSubmitButton
            onClick={handleSubmitButton}
            text="Edit"
            position="absolute"
          />
        }
        icon={<FaHome />}
        name={`Your Channel: ${channel.name}/${topic.name}`}
      />
      <MainContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ChannelTitleElement channel={channel} topic={topic} />
            <p className="channel-page__description">{topic.description}</p>
            <ChannelLatestArticles channel={channel} name="Latest Articles" />
          </>
        )}
      </MainContainer>
    </MainSection>
  );
};

export default ChannelPage;
