import { useState } from "react";
import { useParams } from "react-router";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import MainContainer from "../components/main-components/MainContainer";
import ChannelTitleElement from "../components/channel/ChannelTitleElement";
import ChannelLatestArticles from "../components/channel/ChannelLatestArticles";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { channelsApi, postsApi, subscriptionsApi } from "../api";
import { useApi } from "../hooks/useApi";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import { isFollowingTopic } from "../script/subscriptionStatus";
import "./TopicPage.scss";

const loadTopicPage = async (channelId, topicId) => {
  const [channel, posts, subscriptions] = await Promise.all([
    channelsApi.get(channelId),
    postsApi.byChannel(channelId),
    subscriptionsApi.list(),
  ]);
  enrichChannelsWithLogoPlaceholderBackground([channel]);
  return {
    channel,
    topic: channel.topics.find((topic) => topic.topicId === topicId) ?? {},
    posts: posts.filter((post) => post.topic?.topicId === topicId),
    isFollowing: isFollowingTopic(subscriptions, channelId, topicId),
  };
};

const TopicPage = () => {
  const { channelId, topicId } = useParams();
  const { data, loading, error, reload } = useApi(
    () => loadTopicPage(channelId, topicId),
    [channelId, topicId],
  );
  const [actionError, setActionError] = useState(null);

  const toggleFollow = async () => {
    setActionError(null);
    try {
      if (data.isFollowing) await subscriptionsApi.unfollow({ channelId, topicId });
      else await subscriptionsApi.follow({ channelId, topicId });
      reload();
    } catch (err) {
      setActionError(err);
    }
  };

  if (loading) {
    return (
      <MainSection>
        <Loader />
      </MainSection>
    );
  }

  return (
    <MainSection>
      <ErrorMessage error={error ?? actionError} />
      {data && (
        <>
          <TopNavigationBar
            button={
              <SmallSubmitButton
                onClick={toggleFollow}
                text={data.isFollowing ? "Unfollow" : "Follow"}
                position="absolute"
                color={data.isFollowing && "red"}
              />
            }
            channel={data.channel}
            topic={data.topic}
          />
          <MainContainer>
            <ChannelTitleElement channel={data.channel} topic={data.topic} />
            <p data-aos="zoom-fade-in" className="channel-page__description">
              {data.topic.description}
            </p>
            <ChannelLatestArticles name="Latest Articles" posts={data.posts} />
          </MainContainer>
        </>
      )}
      <Footer />
    </MainSection>
  );
};

export default TopicPage;
