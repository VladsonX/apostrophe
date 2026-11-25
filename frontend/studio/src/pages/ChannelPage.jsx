import { useNavigate, useParams } from "react-router";
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
import { channelsApi, postsApi } from "../api";
import { useApi } from "../hooks/useApi";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import "./ChannelPage.scss";

const loadChannelPage = async (channelId) => {
  const [channel, posts] = await Promise.all([
    channelsApi.get(channelId),
    postsApi.byChannel(channelId),
  ]);
  enrichChannelsWithLogoPlaceholderBackground([channel]);
  return { channel, posts };
};

const ChannelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useApi(() => loadChannelPage(id), [id]);
  const channel = data?.channel;

  return (
    <MainSection>
      <TopNavigationBar
        button={
          <SmallSubmitButton
            onClick={() => navigate(`/channel/editchannel/${id}`)}
            text="Edit"
            position="absolute"
          />
        }
        channel={channel}
      />
      <MainContainer>
        <ErrorMessage error={error} />
        {loading ? (
          <Loader />
        ) : (
          channel && (
            <>
              <ChannelTitleElement channel={channel} />
              <p data-aos="zoom-fade-in" className="channel-page__description">
                {channel.description}
              </p>
              {channel.topicsEnabled && (
                <ChannelTopicsElement
                  aosEffect="zoom-fade-in"
                  topics={channel.topics}
                  name="Topics"
                  channel={channel}
                />
              )}
              <ChannelLatestArticles
                aosEffect="fade-up"
                channel={channel}
                posts={data.posts}
                canAddArticle={!channel.topicsEnabled}
                name="Latest Articles"
              />
            </>
          )
        )}
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default ChannelPage;
