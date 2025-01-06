import "./CreateChannelPage.scss";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { FaHome } from "react-icons/fa";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import { useState, useEffect } from "react";
import ChannelSettingsInput from "../components/create-channel-items/CreateChannelInput";
import CreateChannelTopics from "../components/create-channel-items/CreateChannelTopics";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import CreateChannelLogo from "../components/create-channel-items/CreateChannelLogo";
import { useParams, useNavigate } from "react-router";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { serverURL } from "../server";

const CreateChannelPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);

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

  const channel = channels.find((channel) => (channel.channelId = id));
  console.log(channels);

  return (
    <MainSection>
      <TopNavigationBar
        button={<SmallSubmitButton text="Save" position="absolute" />}
        icon={<FaHome />}
        name="Create new channel: "
      />
      <MainContainer>
        <CreateChannelElement name="Channel Logo">
          <CreateChannelLogo
            name={channels ? channels.name : null}
            logo={channels ? channels.avatar : null}
            isLoading={loading}
          />
        </CreateChannelElement>
        <CreateChannelElement name="Channel Name">
          <ChannelSettingsInput
            name={channels ? channels.name : null}
            type="name"
            placeholder="My Lovely Channel"
            maxCharCount="64"
          />
        </CreateChannelElement>
        <CreateChannelElement name="Channel Description">
          <ChannelSettingsInput
            description={channels ? channels.description : null}
            type="description"
            placeholder="I really love my lovely channel"
            maxCharCount="500"
          />
        </CreateChannelElement>
        <CreateChannelElement name="Channel Topics">
          <CreateChannelTopics topics = {channels ? channels.topics : null}/>
        </CreateChannelElement>
      </MainContainer>
    </MainSection>
  );
};

export default CreateChannelPage;
