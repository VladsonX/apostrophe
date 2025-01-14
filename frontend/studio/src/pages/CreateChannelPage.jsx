import "./CreateChannelPage.scss";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { FaHome } from "react-icons/fa";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import { useState } from "react";
import ChannelSettingsInput from "../components/create-channel-items/CreateChannelInput";
import CreateChannelTopics from "../components/create-topic-items/CreateChannelTopics";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import CreateChannelLogo from "../components/create-channel-items/CreateChannelLogo";
import { v4 as uuidv4 } from "uuid";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { useNavigate } from "react-router";

const CreateChannelPage = () => {
  const [customImg, setCustomImg] = useState(null);
  const [customChannel, setCustomChannel] = useState({});
  const [customChannelName, setCustomChannelName] = useState("");
  const [customChannelDescr, setCustomChannelDescr] = useState("");
  const [customTopics, setCustomTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const token = getCurrentJwtToken();
  if (!token) {
    setError("User is not authenticated");
    setLoading(false);
    navigate("welcome");
    return;
  }

  const handleSaveButton = () => {
    const newCustomChannel = {
      // channelId: uuidv4(),
      name: customChannelName,
      description: customChannelDescr,
      avatar: customImg,
      // ownerId: ownerId,
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
        name={`Edit your channel: `}
      />
      <MainContainer>
        <CreateChannelElement name="Channel Logo">
          <CreateChannelLogo customImg={setCustomImg} />
        </CreateChannelElement>
        <CreateChannelElement name="Channel Name">
          <ChannelSettingsInput
            name={setCustomChannelName}
            descr={setCustomChannelDescr}
            key={customChannelName}
            type="name"
            placeholder="My Lovely Channel"
            maxCharCount="64"
          />
        </CreateChannelElement>
        <CreateChannelElement name="Channel Description">
          <ChannelSettingsInput
            name={setCustomChannelName}
            descr={setCustomChannelDescr}
            key={customChannelName}
            type="description"
            placeholder="I really love my lovely channel"
            maxCharCount="500"
          />
        </CreateChannelElement>
        <CreateChannelElement name="Channel Topics">
          <CreateChannelTopics
            updateTopics={setCustomTopics}
            customImg={customImg}
            channel={customChannel}
          />
        </CreateChannelElement>
      </MainContainer>
    </MainSection>
  );
};

export default CreateChannelPage;
