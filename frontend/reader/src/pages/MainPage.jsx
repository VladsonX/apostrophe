import { FaHome } from "react-icons/fa";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import HotTopicsElement from "../components/hot-topics/HotTopicsElement";
import ChannelLatestArticles from "../components/channel/ChannelLatestArticles";
import Footer from "../components/main-components/Footer";
import Loader from "../components/main-components/Loader";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { postsApi } from "../api";
import { useApi } from "../hooks/useApi";
import enrichPostsWithChannelLogoPlaceholderBackground from "../script/PostChannelLogoPlaceholderBackground";
import "./MainPage.scss";

const loadHomeFeed = async () => {
  const [latest, hot] = await Promise.all([postsApi.latest(), postsApi.explore(5)]);
  enrichPostsWithChannelLogoPlaceholderBackground(latest);
  enrichPostsWithChannelLogoPlaceholderBackground(hot);
  return { latest, hot };
};

const MainPage = () => {
  const { data, loading, error } = useApi(loadHomeFeed, []);

  return (
    <MainSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavigationBar icon={<FaHome />} name="Home" />
          <MainContainer>
            <ErrorMessage error={error} />
            {data && (
              <>
                <HotTopicsElement title="Hot Topics" posts={data.hot} />
                <ChannelLatestArticles posts={data.latest} name="Latest Articles" />
              </>
            )}
          </MainContainer>
          <Footer />
        </>
      )}
    </MainSection>
  );
};

export default MainPage;
