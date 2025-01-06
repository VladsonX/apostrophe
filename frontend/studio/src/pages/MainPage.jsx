import ChannelListItem from "../components/ChannelListItem";
import ChannelsList from "../components/ChannelsList";
import MainContainer from "../components/main-components/MainContainer";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { FaHome } from "react-icons/fa";
import { serverURL } from "../server";
import { useEffect, useState } from "react";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import CreateChannelListItem from "../components/create-channel-items/CreateChannelListItem";
import { useNavigate } from "react-router";
import MainSection from "../components/main-components/MainSection";

function MainPage() {
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
        const data = await res.json();
        setChannels(data);
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
        <ChannelsList>
          {channels.map((channel) => (
            <ChannelListItem
              channel={channel}
              key={channel.channelId}
            />
          ))}
          <CreateChannelListItem />
        </ChannelsList>
      </MainContainer>
    </MainSection>



  );
}

export default MainPage;
