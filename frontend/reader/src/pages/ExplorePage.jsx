import { LiaMapSignsSolid } from "react-icons/lia";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import ChannelLatestArticles from "../components/channel/ChannelLatestArticles";
import Footer from "../components/main-components/Footer";
import Loader from "../components/main-components/Loader";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { postsApi } from "../api";
import { useApi } from "../hooks/useApi";
import enrichPostsWithChannelLogoPlaceholderBackground from "../script/PostChannelLogoPlaceholderBackground";
import "./ExplorePage.scss";

const loadExplorePosts = async () => {
  const posts = await postsApi.explore(99);
  enrichPostsWithChannelLogoPlaceholderBackground(posts);
  return posts;
};

const ExplorePage = () => {
  const { data: posts, loading, error } = useApi(loadExplorePosts, []);

  return (
    <MainSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavigationBar icon={<LiaMapSignsSolid />} name="Explore" />
          <MainContainer>
            <ErrorMessage error={error} />
            <div className="explore__element">
              <ChannelLatestArticles posts={posts ?? []} name="Latest Articles" />
            </div>
          </MainContainer>
        </>
      )}
      <Footer />
    </MainSection>
  );
};

export default ExplorePage;
