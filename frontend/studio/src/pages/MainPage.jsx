import { FaHome } from "react-icons/fa";
import ChannelListItem from "../components/channel-list/ChannelListItem";
import ChannelsList from "../components/channel-list/ChannelsList";
import CreateChannelListItem from "../components/channel-list/CreateChannelListItem";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { channelsApi } from "../api";
import { useApi } from "../hooks/useApi";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";

const loadMyChannels = async () => {
  const channels = await channelsApi.listMine();
  enrichChannelsWithLogoPlaceholderBackground(channels);
  return channels;
};

const MainPage = () => {
  const { data: channels, loading, error } = useApi(loadMyChannels, []);

  return (
    <MainSection>
      <TopNavigationBar icon={<FaHome />} name="My Channels" />
      <MainContainer>
        <ErrorMessage error={error} />
        {loading ? (
          <Loader />
        ) : (
          <CreateChannelElement name="My channels" number={channels?.length ?? 0}>
            <ChannelsList>
              {channels?.map((channel) => (
                <ChannelListItem aosEffect="fade-up" channel={channel} key={channel.channelId} />
              ))}
              <CreateChannelListItem aosEffect="fade-up" />
            </ChannelsList>
          </CreateChannelElement>
        )}
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default MainPage;
