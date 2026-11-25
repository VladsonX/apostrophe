import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import "./SubscriptionsPage.scss";
import { BsMailboxFlag } from "react-icons/bs";
import ChannelsList from "../components/channel-list/ChannelsList";
import ChannelListItem from "../components/channel-list/ChannelListItem";
import ChannelRecommended from "../components/create-channel-items/ChannelRecommended";
import ChannelHeading2 from "../components/channel/ChannelHeading2";
import Footer from "../components/main-components/Footer";
import { useEffect, useState } from "react";
import { serverURL } from "../script/server";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { useNavigate } from "react-router";
import Loader from "../components/main-components/Loader";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import enrichPostsWithChannelLogoPlaceholderBackground from "../script/PostChannelLogoPlaceholderBackground";
import AOS from "aos";
import "aos/dist/aos.css";

const Subscriptions = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [recommendedChannels, setRecommendedChannels] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
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
        const response = await fetch(`${serverURL}/api/v1/subscriptions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const loadedSubscriptions = await response.json();
        console.log(loadedSubscriptions);
        enrichPostsWithChannelLogoPlaceholderBackground(loadedSubscriptions);
        const channels = [];
        const topics = [];

        loadedSubscriptions.forEach((subscription) => {
          if (subscription.topic) {
            topics.push(subscription);
          } else {
            channels.push(subscription);
          }
        });
        const filteredChannels = channels.filter((channel) => {
          return !topics.some(
            (topic) => topic.channel.channelId === channel.channel.channelId
          );
        });
        const allSubscriptions = [...filteredChannels, ...topics];

        setSubscriptions(allSubscriptions);
        console.log("All Subs: ", allSubscriptions);
      } catch (error) {
        setError(error);
      }
      try {
        const response = await fetch(
          `${serverURL}/api/v1/channels/search?query`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const loadedRecommendedChannels = await response.json();

        enrichChannelsWithLogoPlaceholderBackground(loadedRecommendedChannels);
        setRecommendedChannels(loadedRecommendedChannels);
        console.log(loadedRecommendedChannels);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, [navigate]);

  useEffect(() => {
    if (subscriptions.length && recommendedChannels.length) {
      const filteredRecommendedChannels = recommendedChannels.filter(
        (element) =>
          !subscriptions.some(
            (subscription) =>
              subscription.channel.channelId === element.channelId
          )
      );
      if (filteredRecommendedChannels.length !== recommendedChannels.length) {
        setRecommendedChannels(filteredRecommendedChannels);
      }
    }
  }, [subscriptions, recommendedChannels]);

  return (
    <MainSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavigationBar icon={<BsMailboxFlag />} name="Subscriptions" />
          <MainContainer>
            <div className="subscriptions__element">
              <ChannelHeading2 name="Subscriptions" number={subscriptions.length} />
              <ChannelsList>
                {subscriptions ? (
                  subscriptions.map((subscription) => (
                    <ChannelListItem
                      aosEffect="fade-up"
                      subscription={subscription}
                      key={subscription.subscriptionId}
                    />
                  ))
                ) : (
                  <></>
                )}
              </ChannelsList>
            </div>
            <div className="subscriptions__element">
              <ChannelHeading2 name="Recommended" number={recommendedChannels.length}/>
              <div className="subscriptions-recommended-wrapper">
                {recommendedChannels ? (
                  recommendedChannels.map((channel) => (
                    <ChannelRecommended
                      aosEffect="fade-up"
                      channel={channel}
                      key={channel.channelId}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </MainContainer>
        </>
      )}

      <Footer />
    </MainSection>
  );
};

export default Subscriptions;
