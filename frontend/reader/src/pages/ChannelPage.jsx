import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import "./ChannelPage.scss";
import SmalSubmitButton from "../components/main-components/SmallSubmitButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { serverURL } from "../server";
import { useParams } from "react-router";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import MainContainer from "../components/main-components/MainContainer";
import ChannelTitleElement from "../components/channel/ChannelTitleElement";
import ChannelTopicsElement from "../components/channel/ChannelTopicsElement";
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
  const [posts, setPosts] = useState([]);
  const { channelId } = useParams();
  const [channel, setChannel] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(null);
  const [topicsFollow, setTopicsFollow] = useState([]);
  const navigate = useNavigate();
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
        enrichChannelsWithLogoPlaceholderBackground([channel]);
        setChannel(channel);
        console.log(channel);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchChannels();
  }, [channelId, navigate]);

  useEffect(() => {
    console.log(channel);
    const fetchPosts = async () => {
      const token = getCurrentJwtToken();
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("/welcome");
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
        setPosts(posts);
        console.log(posts);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPosts();
  }, [channel, channelId, navigate]);
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
        const foundSubscriptions = allSubscriptions.filter(
          (element) => element.channel.channelId === channelId
        );
        if (foundSubscriptions.length) {
          console.log("Found subscriptions: ", foundSubscriptions);
          if (foundSubscriptions.some((element) => element.topic)) {
            console.log(
              "User is not subscribed to the channel: ",
              foundSubscriptions
            );
            setFollow(true);
            const foundTopicsSubscription = foundSubscriptions.filter(
              (element) => element.topic
            );
            console.log(
              "User is subscribed to topics on this channel: ",
              foundTopicsSubscription
            );
            setTopicsFollow(foundTopicsSubscription.map(elem=>elem.topic));
          } else {
            console.log(
              "User is subscribed to this channel: ",
              foundSubscriptions
            );
            setFollow(true);
            console.log(channel.topics);
            if (channel.topics && channel.topics.length) {
              console.log(
                "Channel has topics, so topics are followed: ",
                channel.topics
              );
              setTopicsFollow(channel.topics);
            } else {
              setTopicsFollow(null);
            }
          }
        } else {
          console.log(
            "User is not subscribed neither to channel nor to any topics"
          );
          setFollow(false);
          setTopicsFollow(null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getSubscriptionStatus();
  }, [navigate, channel, channelId, channel.topics]);

  const handleSubmitButton = async () => {
    console.log("Button clicked")
    setLoading(true);
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
      };
      const method =
        follow ? "DELETE" : "POST";
        console.log(method);

      const response = await fetch(
        `${serverURL}/api/v1/subscriptions` +
          (follow ? `?channelId=${channelId}` : ""),
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(follow ? "Unfollow failed" : "Follow failed");
      }
      navigate(0);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
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
          />
          <MainContainer>
            <ChannelTitleElement channel={channel} />
            <p data-aos="zoom-fade-in" className="channel-page__description">
              {channel.description}
            </p>
            {channel.topicsEnabled && (
              <ChannelTopicsElement
                aosEffect="zoom-fade-in"
                topics={channel.topics}
                topicsFollowed={topicsFollow}
                name="Topics"
                channel={channel}
              />
            )}
            <ChannelLatestArticles
              aosEffect="fade-up"
              channel={channel}
              posts={posts}
              name="Latest Articles"
              type="Channel"
            />
          </MainContainer>
        </>
      )}
      <Footer />
    </MainSection>
  );
};

export default ChannelPage;
