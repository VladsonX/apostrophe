import ChannelListItem from "../components/channel-list/ChannelListItem";
import ChannelsList from "../components/channel-list/ChannelsList";
import MainContainer from "../components/main-components/MainContainer";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { FaHome } from "react-icons/fa";
import { serverURL } from "../server";
import { useEffect, useState } from "react";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import CreateChannelListItem from "../components/channel-list/CreateChannelListItem";
import { useNavigate } from "react-router";
import MainSection from "../components/main-components/MainSection";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

function MainPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,  
      easing: 'ease-out',  
      once: true, 
    });
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      const token = getCurrentJwtToken();
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("welcome");
        return;
      }

      try {
        const res = await fetch(`${serverURL}/api/v1/channels`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch channels");
        }

        const channels = await res.json();
        enrichChannelsWithLogoPlaceholderBackground(channels);
        setChannels(channels);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);

  return (
    <MainSection>
      <TopNavigationBar icon={<FaHome />} name="My Channels" />
      <MainContainer>
        {loading ? (
          <Loader />
        ) : (
          <CreateChannelElement name="My channels" number={channels.length}>
            <ChannelsList>
              {channels.map((channel) => (
                <ChannelListItem aosEffect='fade-up'channel={channel} key={channel.channelId} />
              ))}
              <CreateChannelListItem aosEffect='fade-up'/>
            </ChannelsList>
          </CreateChannelElement>
        )}
      </MainContainer>
      <Footer />
    </MainSection>
  );
}

export default MainPage;
