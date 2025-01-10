import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import "./ChannelPage.scss";
import SmalSubmitButton from "../components/main-components/SmallSubmitButton";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { serverURL } from "../server";
import { useParams } from "react-router";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import MainContainer from "../components/main-components/MainContainer";
import ChannelTitleElement from "../components/channel/ChannelTitleElement";
import ChannelTopicsElement from "../components/channel/ChannelTopicsElement";
import ChannelLatestArticles from "../components/channel/ChannelLatestArticles";

const ChannelPage = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
        const response = await fetch(`${serverURL}/api/v1/channels/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch channels");
        }

        const channel = await response.json();
        enrichChannelsWithLogoPlaceholderBackground([channel]);
        setChannel(channel);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, [id, navigate]);

  const handleSubmitButton = () => {
    navigate(`/channel/editchannel/${id}`);
  }
  return (
    <MainSection>
      <TopNavigationBar
        button={
          <SmalSubmitButton
            onClick={handleSubmitButton}
            text="Edit"
            position="absolute"
          />
        }
        icon={<FaHome />}
        // name={`Your Channel: ${channel.name}`}
        name=' British Broadcasting Corporation (BBC)'
      />
      <MainContainer>
        <ChannelTitleElement channel={channel} />
        <p className="channel-page__description">The British Broadcasting Corporation (BBC) is a British public service broadcaster headquartered at Broadcasting House in London, England. Originally established in 1922 as the British Broadcasting Company, it evolved into its current state with its current name on New Year's Day 1927. The oldest and largest local and global broadcaster by stature and by number of employees, the BBC employs over 21,000 staff in total, of whom approximately 17,200 are in public-sector broadcasting.</p>
        {channel.topics && (
          <ChannelTopicsElement
            topics={channel.topics}
            name="Topics"
            channel={channel}
          />
        )}
        <ChannelLatestArticles channel={channel} name='Latest Articles' />
      </MainContainer>
    </MainSection>
  );
};

export default ChannelPage;
