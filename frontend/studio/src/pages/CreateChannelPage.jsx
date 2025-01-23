import "./CreateChannelPage.scss";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { FaHome } from "react-icons/fa";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import { useEffect, useState } from "react";
import CreateChannelInput from "../components/create-channel-items/CreateChannelInput";
import CreateChannelTopics from "../components/create-topic-items/CreateChannelTopics";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import CreateChannelLogo from "../components/create-channel-items/CreateChannelLogo";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { useNavigate } from "react-router";
import Loader from "../components/main-components/Loader";
import TopicModeToggle from "../components/create-channel-items/TopicModeToggle";
import { serverURL } from "../server";
import Footer from "../components/main-components/Footer";
import { NavLink } from "react-router";

const CreateChannelPage = () => {
  const [customImg, setCustomImg] = useState(null);
  const [customChannel, setCustomChannel] = useState({});
  const [customChannelName, setCustomChannelName] = useState("");
  const [customChannelDescr, setCustomChannelDescr] = useState("");
  const [customTopics, setCustomTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [enableTopicMode, setEnableTopicMode] = useState(false);
  const [confirmationForm, setConfirmationForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCurrentJwtToken();
    if (!token) {
      setError("User is not authenticated");
      navigate("welcome");
      return;
    }
    setLoading(false);
  }, [navigate]);

  const handleSaveButton = async () => {
    const token = getCurrentJwtToken();
    if (!token) {
      setError("User is not authenticated");
      navigate("welcome");
      return;
    }
    const newCustomChannel = {
      // channelId: uuidv4(),
      name: customChannelName,
      description: customChannelDescr,
      avatar: customImg ? customImg : null,
      topicsEnabled: enableTopicMode,
      topics: customTopics,
    };
    setCustomChannel(newCustomChannel);
    console.log(newCustomChannel);
    console.log("Payload:", JSON.stringify(newCustomChannel));
    try {
      const res = await fetch(`${serverURL}/api/v1/channels`, {
        method: "POST",
        body: JSON.stringify(newCustomChannel),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch channels");
      }
      setConfirmationForm(true);
    } catch (error) {}
  };

  return (
    <MainSection>
      {confirmationForm ? (
        <div className="create-channel-page__confirmation">
          <p className="create-channel-page__confirmation-text">
            <span className="create-channel-page__confirmation-text_big">
              Congratulations!
            </span>
          </p>
          <p className="create-channel-page__confirmation-text">
            Your channel called{" "}
            <span className="create-channel-page__confirmation-text_color">
              {customChannelName}
            </span>
            {" "}has just been created.
          </p>
          <p className="create-channel-page__confirmation-text">
            Go to{" "}
            <NavLink
              to={`/`}
              className="create-channel-page__confirmation-text_gradient"
            >
              Main Page
            </NavLink>
          </p>
        </div>
      ) : (
        <>
          <TopNavigationBar
            button={
              <SmallSubmitButton
                onClick={handleSaveButton}
                text="Save"
                position="absolute"
              />
            }
            icon={<FaHome />}
            name={`Create new channel: `}
          />
          <MainContainer>
            {loading ? (
              <Loader />
            ) : (
              <>
                <CreateChannelElement name="Channel Logo">
                  <CreateChannelLogo customImg={setCustomImg} />
                </CreateChannelElement>
                <CreateChannelElement name="Channel Name">
                  <CreateChannelInput
                    name={setCustomChannelName}
                    descr={setCustomChannelDescr}
                    type="name"
                    placeholder="My Lovely Channel"
                    maxCharCount="64"
                  />
                </CreateChannelElement>
                <CreateChannelElement name="Channel Description">
                  <CreateChannelInput
                    name={setCustomChannelName}
                    descr={setCustomChannelDescr}
                    type="description"
                    placeholder="I really love my lovely channel"
                    maxCharCount="500"
                  />
                </CreateChannelElement>

                <CreateChannelElement name="Topic Mode">
                  <div className="topic-mode-wrapper">
                    <TopicModeToggle
                      topics={setCustomTopics}
                      setTopicMode={setEnableTopicMode}
                      topicMode={enableTopicMode}
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
                        at least one topic should be created. All the articles
                        you create further should be added to certain topic.
                      </span>
                    </p>
                  </div>
                </CreateChannelElement>
                {enableTopicMode ? (
                  <CreateChannelElement name="Channel Topics">
                    <CreateChannelTopics
                      newTopics={customTopics}
                      updateTopics={setCustomTopics}
                      customImg={customImg}
                      channel={customChannel}
                    />
                  </CreateChannelElement>
                ) : (
                  <></>
                )}
              </>
            )}
          </MainContainer>
          <Footer />
        </>
      )}
    </MainSection>
  );
};

export default CreateChannelPage;
