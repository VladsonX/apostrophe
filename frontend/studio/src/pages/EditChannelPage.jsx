import "./CreateChannelPage.scss";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { FaHome } from "react-icons/fa";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import { useState, useEffect } from "react";
import ChannelSettingsInput from "../components/create-channel-items/CreateChannelInput";
import CreateChannelTopics from "../components/create-topic-items/CreateChannelTopics";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import CreateChannelLogo from "../components/create-channel-items/CreateChannelLogo";
import { useParams, useNavigate } from "react-router";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { serverURL } from "../server";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";

const CreateChannelPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState([]);
  const [error, setError] = useState(null);
  const [customImg, setCustomImg] = useState(null);
  const [customChannelName, setCustomChannelName] = useState("");
  const [customChannelDescr, setCustomChannelDescr] = useState("");
  const [customTopics, setCustomTopics] = useState([]);
  const [customChannel, setCustomChannel] = useState({});

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

  useEffect(() => {
    if (channel) {
      setCustomChannelName(channel.name || "");
      setCustomChannelDescr(channel.description || "");
      setCustomTopics(channel.topics || []);
      setCustomChannel(channel || {});
    }
  }, [channel]);

  const handleSaveButton = () => {
    const newCustomChannel = {
      channelId: channel.channelId,
      name: customChannelName,
      description: customChannelDescr,
      avatar: customImg,
      ownerId: channel.ownerId,
      topic: customTopics,
    };
    setCustomChannel(newCustomChannel);
    console.log(newCustomChannel);
  };
  return (
    <MainSection>
      <TopNavigationBar
        button={
          <SmallSubmitButton
            onClick={handleSaveButton}
            text="Save"
            position="absolute"
          />
        }
        icon={<FaHome />}
        name={`Edit your channel: ${channel.name}`}
      />
      <MainContainer>
        <CreateChannelElement name="Channel Logo">
          <CreateChannelLogo
            customImg={setCustomImg}
            channel={channel}
            isLoading={loading}
          />
        </CreateChannelElement>
        <CreateChannelElement name="Channel Name">
          <ChannelSettingsInput
            name={setCustomChannelName}
            descr={setCustomChannelDescr}
            key={channel.name}
            channel={channel}
            type="name"
            placeholder="My Lovely Channel"
            maxCharCount="64"
          />
        </CreateChannelElement>
        <CreateChannelElement name="Channel Description">
          <ChannelSettingsInput
            name={setCustomChannelName}
            descr={setCustomChannelDescr}
            key={channel.name}
            channel={channel}
            type="description"
            placeholder="I really love my lovely channel"
            maxCharCount="500"
          />
        </CreateChannelElement>
        <CreateChannelElement name="Channel Topics" number={customTopics.length}>
          <CreateChannelTopics
            updateTopics={setCustomTopics}
            customImg={customImg}
            channel={channel}
          />
        </CreateChannelElement>
      </MainContainer>
    </MainSection>
  );
};

export default CreateChannelPage;
