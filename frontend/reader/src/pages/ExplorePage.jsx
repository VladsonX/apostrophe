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

const Explore = () => {
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
      <TopNavigationBar icon={<LiaMapSignsSolid />} name="Explore" />
      <MainContainer>
        <div className="explore__element">
          <ChannelLatestArticles
            channel={channelExample}
            name="Latest Articles"
          />
        </div>
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default Explore;
