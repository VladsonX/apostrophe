import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import "./TopicPage.scss";
import SmalSubmitButton from "../components/main-components/SmallSubmitButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { serverURL } from "../script/server";
import { useParams } from "react-router";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import MainContainer from "../components/main-components/MainContainer";
import ChannelTitleElement from "../components/channel/ChannelTitleElement";
import ChannelLatestArticles from "../components/channel/ChannelLatestArticles";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const ChannelPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);
  const { channelId, topicId } = useParams();
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    console.log(channel);
    const fetchPosts = async () => {
      const token = getCurrentJwtToken();
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("welcome");
        return;
      }
      try {
        const response = await fetch(
          `${serverURL}/api/v1/posts?channelId=${channelId}&from=0&to=100`,
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
        const posts = await response.json();
        setPosts(posts);
        console.log(posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [channel, navigate]);

  const handleSubmitButton = () => {
    navigate(`edit`);
  };
  return (
    <MainSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavigationBar
            button={
              <SmalSubmitButton
                onClick={handleSubmitButton}
                text="Edit"
                position="absolute"
              />
            }
            // icon={<FaHome />}
            // name={`Your Channel's topic: `}
            channel={channel}
            topic={topic}
          />
          <MainContainer>
            <ChannelTitleElement channel={channel} topic={topic} />
            <p data-aos="zoom-fade-in" className="channel-page__description">
              {topic.description}
            </p>
            <ChannelLatestArticles
              aosEffect="zoom-fade-in"
              channel={channel}
              name="Latest Articles"
              type="Topic"
              posts={posts}
              topicId={topicId}
            />
          </MainContainer>
          <Footer />
        </>
      )}
    </MainSection>
  );
};

export default ChannelPage;
