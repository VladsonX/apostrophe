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
  const [follow, setFollow] = useState(null);

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, [topicId, channelId, navigate]);

  useEffect(() => {
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
          `${serverURL}/api/v1/posts?channelId=${channelId}&from=1&to=100`,
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
        setPosts(posts.filter((post) => post.topic.topicId === topicId));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [navigate, channelId, topicId]);

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      const token = getCurrentJwtToken();
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("welcome");
        return;
      }
      try {
        const response = await fetch(`${serverURL}/api/v1/subscriptions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const allSubscriptions = await response.json();
        console.log(allSubscriptions);
        const foundSubscription = allSubscriptions.find(
          (element) =>
            element.topic?.topicId === topicId ||
            (element.channel.channelId === channelId && !element.topic)
        );
        console.log("Found subs:", foundSubscription);
        if (foundSubscription) {
          console.log("User is subscribed: ", foundSubscription);
          setFollow(true);
        } else {
          console.log("User is not subscribed: ", foundSubscription);
          setFollow(false);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getSubscriptionStatus();
  }, [navigate, topicId, channelId]);

  const handleSubmitButton = async () => {
    const token = getCurrentJwtToken();
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      navigate("welcome");
      return;
    }
    try {
      const body = {
        channel: {
          channelId: channelId,
        },
        topic: {
          topicId: topicId,
        },
      };
      const method = follow ? "DELETE" : "POST";

      const response = await fetch(
       `${serverURL}/api/v1/subscriptions` +
          (follow ? `?channelId=${channelId}&topicId=${topicId}` : ""),
          {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(follow ? "Unfollow failed" : "Follow failed");
      }

      console.log(follow ? "Unfollowed successfully" : "Followed successfully");
      setFollow(!follow);
    } catch (error) {
      setError(error);
    }
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
                text={follow ? "Unfollow" : "Follow"}
                position="absolute"
                color={follow && "red"}
              />
            }
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
              posts={posts}
              topicId={topicId}
            />
          </MainContainer>
        </>
      )}

      <Footer />
    </MainSection>
  );
};

export default ChannelPage;
