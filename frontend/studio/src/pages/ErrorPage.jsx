import ChannelHeading2 from "../components/channel/ChannelHeading2";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import "./ExplorePage.scss";
import { LiaMapSignsSolid } from "react-icons/lia";
import ChannelLatestArticles from "../components/channel/ChannelLatestArticles";
import { useState, useEffect } from "react";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { useNavigate } from "react-router";
import Footer from "../components/main-components/Footer";
import { serverURL } from "../server";
import Loader from "../components/main-components/Loader";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import enrichPostsWithChannelLogoPlaceholderBackground from "../script/PostChannelLogoPlaceholderBackground";


const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [posts, setPosts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      const token = getCurrentJwtToken();
      console.log(token);
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("welcome");
        return;
      }
      try {
        const response = await fetch(
          `${serverURL}/api/v1/posts/explore?limit=99`,
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
        const loadedPosts = await response.json();
        enrichPostsWithChannelLogoPlaceholderBackground(loadedPosts);
        setPosts(loadedPosts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [navigate]);
  return (
    <MainSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavigationBar icon={<LiaMapSignsSolid />} name="Explore" />
          <MainContainer>
            <div className="explore__element">
              <ChannelLatestArticles posts={posts} name="Latest Articles" />
            </div>
          </MainContainer>
        </>
      )}

      <Footer />
    </MainSection>
  );
};

export default Explore;
