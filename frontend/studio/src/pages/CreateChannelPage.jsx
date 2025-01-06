import "./CreateChannelPage.scss";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { FaHome } from "react-icons/fa";
import MainContainer from "../components/MainContainer";
import MainSection from "../components/MainSection";
import SmallSubmitButton from "../components/SmallSubmitButton";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IconContext } from "react-icons";
import ChannelSettingsInput from "../components/ChannelSettingsInput";
import CreateChannelTopics from "../components/CreateChannelTopics";
import CreateChannelTitle from "../components/CreateChannelTitle";

const CreateChannelPage = () => {
  const [isLoading, SetIsLoading] = useState(true);
  return (
    <MainSection>
      <TopNavigationBar
        button={<SmallSubmitButton text="Save" position="absolute" />}
        icon={<FaHome />}
        name="Create new channel: "
      />
      <MainContainer>
        <div className="channel-settings__element">
          <CreateChannelTitle name='Channel Logo:' />
          <div className="channel-settings__img-button-wrapper">
            {isLoading ? (
              <div className="channel-settings__placeholder">
                <div>
                  <IconContext.Provider
                    value={{
                      size: "1.5rem",
                      className: "channel-settings__add-icon",
                    }}
                  >
                    <FaPlus />
                  </IconContext.Provider>
                </div>
              </div>
            ) : (
              <img src="" alt="" />
            )}
            <SmallSubmitButton text="Add" />
          </div>
        </div>
        <ChannelSettingsInput type='name' name='Channel name' placeholder='My Lovely Channel' maxCharCount='64' />
        <ChannelSettingsInput type='description' name='Channel Description' placeholder='I really love my lovely channel' maxCharCount='500' />
      <CreateChannelTopics />
      </MainContainer>
    </MainSection>
  );
};

export default CreateChannelPage;
