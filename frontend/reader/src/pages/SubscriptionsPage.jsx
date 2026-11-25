import { BsMailboxFlag } from "react-icons/bs";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import ChannelsList from "../components/channel-list/ChannelsList";
import ChannelListItem from "../components/channel-list/ChannelListItem";
import ChannelRecommended from "../components/create-channel-items/ChannelRecommended";
import ChannelHeading2 from "../components/channel/ChannelHeading2";
import Footer from "../components/main-components/Footer";
import Loader from "../components/main-components/Loader";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { channelsApi, subscriptionsApi } from "../api";
import { useApi } from "../hooks/useApi";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import enrichPostsWithChannelLogoPlaceholderBackground from "../script/PostChannelLogoPlaceholderBackground";
import "./SubscriptionsPage.scss";

const loadSubscriptionsPage = async () => {
  const [subscriptions, allChannels] = await Promise.all([
    subscriptionsApi.list(),
    channelsApi.search(""),
  ]);
  enrichPostsWithChannelLogoPlaceholderBackground(subscriptions);
  enrichChannelsWithLogoPlaceholderBackground(allChannels);

  const topicSubscriptions = subscriptions.filter((s) => s.topic);
  // Hide a channel-wide subscription when the user also follows topics of that channel.
  const channelSubscriptions = subscriptions.filter(
    (s) => !s.topic && !topicSubscriptions.some((t) => t.channel.channelId === s.channel.channelId),
  );
  const visibleSubscriptions = [...channelSubscriptions, ...topicSubscriptions];

  const followedChannelIds = new Set(subscriptions.map((s) => s.channel.channelId));
  const recommended = allChannels.filter((c) => !followedChannelIds.has(c.channelId));

  return { subscriptions: visibleSubscriptions, recommended };
};

const SubscriptionsPage = () => {
  const { data, loading, error } = useApi(loadSubscriptionsPage, []);

  return (
    <MainSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavigationBar icon={<BsMailboxFlag />} name="Subscriptions" />
          <MainContainer>
            <ErrorMessage error={error} />
            {data && (
              <>
                <div className="subscriptions__element">
                  <ChannelHeading2 name="Subscriptions" number={data.subscriptions.length} />
                  <ChannelsList>
                    {data.subscriptions.map((subscription) => (
                      <ChannelListItem
                        aosEffect="fade-up"
                        subscription={subscription}
                        key={subscription.subscriptionId}
                      />
                    ))}
                  </ChannelsList>
                </div>
                <div className="subscriptions__element">
                  <ChannelHeading2 name="Recommended" number={data.recommended.length} />
                  <div className="subscriptions-recommended-wrapper">
                    {data.recommended.map((channel) => (
                      <ChannelRecommended
                        aosEffect="fade-up"
                        channel={channel}
                        key={channel.channelId}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </MainContainer>
        </>
      )}
      <Footer />
    </MainSection>
  );
};

export default SubscriptionsPage;
