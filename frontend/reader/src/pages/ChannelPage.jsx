import { useState } from "react";
import { useParams } from "react-router";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import MainContainer from "../components/main-components/MainContainer";
import ChannelTitleElement from "../components/channel/ChannelTitleElement";
import ChannelTopicsElement from "../components/channel/ChannelTopicsElement";
import ChannelLatestArticles from "../components/channel/ChannelLatestArticles";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { channelsApi, postsApi, subscriptionsApi } from "../api";
import { useApi } from "../hooks/useApi";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import { getChannelFollowStatus } from "../script/subscriptionStatus";
import "./ChannelPage.scss";

const loadChannelPage = async (channelId) => {
  const [channel, posts, subscriptions] = await Promise.all([
    channelsApi.get(channelId),
    postsApi.byChannel(channelId),
    subscriptionsApi.list(),
  ]);
  enrichChannelsWithLogoPlaceholderBackground([channel]);
  return { channel, posts, ...getChannelFollowStatus(subscriptions, channel) };
};

const ChannelPage = () => {
  const { channelId } = useParams();
  const { data, loading, error, reload } = useApi(() => loadChannelPage(channelId), [channelId]);
  const [actionError, setActionError] = useState(null);

  const toggleFollow = async () => {
    setActionError(null);
    try {
      if (data.isFollowing) await subscriptionsApi.unfollow({ channelId });
      else await subscriptionsApi.follow({ channelId });
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
          />
          <MainContainer>
            <ChannelTitleElement channel={data.channel} />
            <p data-aos="zoom-fade-in" className="channel-page__description">
              {data.channel.description}
            </p>
            {data.channel.topicsEnabled && (
              <ChannelTopicsElement
                aosEffect="zoom-fade-in"
                topics={data.channel.topics}
                topicsFollowed={data.followedTopics}
                name="Topics"
                channel={data.channel}
              />
            )}
            <ChannelLatestArticles posts={data.posts} name="Latest Articles" />
          </MainContainer>
        </>
      )}
      <Footer />
    </MainSection>
  );
};

export default ChannelPage;
