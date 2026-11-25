import { useNavigate, useParams } from "react-router";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import MainContainer from "../components/main-components/MainContainer";
import ChannelTitleElement from "../components/channel/ChannelTitleElement";
import ChannelLatestArticles from "../components/channel/ChannelLatestArticles";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { channelsApi, postsApi } from "../api";
import { useApi } from "../hooks/useApi";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import "./TopicPage.scss";

const loadTopicPage = async (channelId, topicId) => {
  const [channel, posts] = await Promise.all([
    channelsApi.get(channelId),
    postsApi.byChannel(channelId),
  ]);
  enrichChannelsWithLogoPlaceholderBackground([channel]);
  return {
    channel,
    topic: channel.topics.find((topic) => topic.topicId === topicId) ?? {},
    posts: posts.filter((post) => post.topic?.topicId === topicId),
  };
};

const TopicPage = () => {
  const { channelId, topicId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useApi(
    () => loadTopicPage(channelId, topicId),
    [channelId, topicId],
  );

  if (loading) {
    return (
      <MainSection>
        <Loader />
      </MainSection>
    );
  }

  return (
    <MainSection>
      <ErrorMessage error={error} />
      {data && (
        <>
          <TopNavigationBar
            button={
              <SmallSubmitButton onClick={() => navigate("edit")} text="Edit" position="absolute" />
            }
            channel={data.channel}
            topic={data.topic}
          />
          <MainContainer>
            <ChannelTitleElement channel={data.channel} topic={data.topic} />
            <p data-aos="zoom-fade-in" className="channel-page__description">
              {data.topic.description}
            </p>
            <ChannelLatestArticles
              aosEffect="zoom-fade-in"
              name="Latest Articles"
              channel={data.channel}
              posts={data.posts}
              canAddArticle
            />
          </MainContainer>
        </>
      )}
      <Footer />
    </MainSection>
  );
};

export default TopicPage;
