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
import Loader from "../components/main-components/Loader";
import TopicModeToggle from "../components/create-channel-items/TopicModeToggle";
import Footer from "../components/main-components/Footer";

const CreateChannelPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState([]);
  const [error, setError] = useState(null);

  const [customChannelName, setCustomChannelName] = useState("");
  const [customChannelDescr, setCustomChannelDescr] = useState("");
  const [customTopics, setCustomTopics] = useState(channel.topics || []);
  const [customChannel, setCustomChannel] = useState({});
  const [enableTopicMode, setEnableTopicMode] = useState();
  const [customImg, setCustomImg] = useState(null);
  const [topicClicked, setTopicClicked] = useState();

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
      setCustomChannel(channel || {});
      setCustomChannelName(channel.name || "");
      setCustomChannelDescr(channel.description || "");
      setCustomTopics(channel.topics || []);
      // setCustomImg(`${serverURL}/api/v1/media/${channel.avatar}`);
      setCustomImg(channel.avatar);
      setEnableTopicMode(channel.topicsEnabled);
    }
  }, [channel]);

  const handleSaveButton = async () => {
    const token = getCurrentJwtToken();
    if (!token) {
      setError("User is not authenticated");
      navigate("welcome");
      return;
    }
    // setLoading(false);
    const newCustomChannel = {
      channelId: channel.channelId,
      name: customChannelName,
      description: customChannelDescr,
      avatar: customImg ? customImg : null,
      topicsEnabled: enableTopicMode,
      topics: customTopics,
    };
    setCustomChannel(newCustomChannel);
    console.log(newCustomChannel);
    console.log("Update channel:", JSON.stringify(newCustomChannel));
    if (channel.topicsEnabled !== newCustomChannel.topicsEnabled) {
      const newTopic = {
        name: topicClicked.name,
        description: topicClicked.description,
      };
      console.log(newTopic);
      try {
        const response = await fetch(
          `${serverURL}/api/v1/channels/${channel.channelId}/topics/enable`,
          {
            method: "PUT",
            body: JSON.stringify(newTopic),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Topic mode enabled for this channel!");

        if (!response.ok) {
          throw new Error("Failed to fetch channels");
        }
      } catch (error) {}
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
    try {
      const res = await fetch(
        `${serverURL}/api/v1/channels/${channel.channelId}`,
        {
          method: "PATCH",
          body: JSON.stringify(newCustomChannel),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Channel is updated!");

      if (!res.ok) {
        throw new Error("Failed to patch channels");
      }
    } catch (error) {}
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
        channel={channel}
      />
      <MainContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
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
            {channel.topicsEnabled ? (
              <></>
            ) : (
              <CreateChannelElement name="Topic Mode">
                <div className="topic-mode-wrapper">
                  <TopicModeToggle
                    topicMode={enableTopicMode}
                    topics={setCustomTopics}
                    setTopicMode={setEnableTopicMode}
                  />
                  <p className="topic-mode-description">
                    Choose if you want to enable{" "}
                    <span className="topic-mode-description_mode">
                      Topic Mode
                    </span>{" "}
                    for your channel. Once{" "}
                    <span className="topic-mode-description_mode">
                      Topic Mode
                    </span>{" "}
                    is enabled -{" "}
                    <span className="topic-mode-description_bold">
                      at least one topic should be created. All the articles you
                      create further should be added to certain topic.
                    </span>
                  </p>
                </div>
              </CreateChannelElement>
            )}

            {enableTopicMode ? (
              <CreateChannelElement
                name="Channel Topics"
                number={customTopics.length}
              >
                {channel.topicsEnabled ? (
                  <></>
                ) : (
                  <p className="topic-mode-description topic-mode-description_topics-mode">
                    Please click on the{" "}
                    <span className="topic-mode-description_mode">
                      topic you want to transfer all your articles to
                    </span>{" "}
                    before sumbiting this form
                  </p>
                )}

                <CreateChannelTopics
                  setTopicClicked={setTopicClicked}
                  newTopics={customTopics}
                  updateTopics={setCustomTopics}
                  customImg={customImg}
                  channel={channel}
                />
              </CreateChannelElement>
            ) : (
              <></>
            )}
          </>
        )}
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default CreateChannelPage;
