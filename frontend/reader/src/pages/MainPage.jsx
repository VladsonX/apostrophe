import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { FaHome } from "react-icons/fa";
import "./MainPage.scss";
import HotTopicsElement from "../components/hot-topics/HotTopicsElement";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import ChannelLatestArticles from "../components/channel/ChannelLatestArticles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import Footer from "../components/main-components/Footer";
import { serverURL } from "../server";
import Loader from "../components/main-components/Loader";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [posts, setPosts] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      const token = getCurrentJwtToken();
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("welcome");
        return;
      }
      try {
        const response = await fetch(
          `${serverURL}/api/v1/posts/latest?from=0&to=999999`,
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

        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        setError("An error occurred while fetching posts", error);
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
          {" "}
          <TopNavigationBar icon={<FaHome />} name={`Home`} />
          <MainContainer>
            <HotTopicsElement title="Hot Topics" />

            <ChannelLatestArticles posts={posts} name="Latest Articles" />
          </MainContainer>
          <Footer />
        </>
      )}
    </MainSection>
  );
};

export default MainPage;
