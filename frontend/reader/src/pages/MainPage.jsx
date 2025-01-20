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

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCurrentJwtToken();
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      navigate("welcome");
      return;
    }
  }, [navigate]);

  const channelExample = {
    name: "Aboba INC",
    description: "Aboba abuba",
    avatar: null,
  };
  return (
    <MainSection>
      <TopNavigationBar icon={<FaHome />} name={`Home`} />
      <MainContainer>
        <HotTopicsElement title="Hot Topics" />

        <ChannelLatestArticles
          channel={channelExample}
          name="Latest Articles"
        />
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default MainPage;
