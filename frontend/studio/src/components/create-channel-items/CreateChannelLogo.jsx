import "./CreateChannelLogo.scss";
import SmallSubmitButton from "../main-components/SmallSubmitButton";
import CreateChannelTitle from "./CreateChannelTitle";
import { CiImageOn } from "react-icons/ci";

import { IconContext } from "react-icons";

const CreateChannelLogo = ({ isLoading, channel }) => {
  return (
    <>

      <div className="create-channel-logo__wrapper">
        {isLoading ? (
          <div className="create-channel-logo__placeholder">
            <div>
              <IconContext.Provider
                value={{
                  size: "4.5rem",
                  className: "create-channel-logo__add-icon",
                }}
              >
                <CiImageOn />
              </IconContext.Provider>
            </div>
          </div>
        ) : (
           channel.avatar ?
             (
              <img src={channel.avatar} alt={channel.name} />
            ) :  (
              <div
              className="channel-list-item__logo channel-list-item__logo-placeholder channel-list-item__logo-placeholder_big"
              style={{ backgroundColor: channel.logoPlaceholderColor }}
            >
              <span>{channel.name.charAt(0).toUpperCase()}</span>
            </div>
         

        ))
      }
        <SmallSubmitButton text="Add" />
      </div>
    </>
  );
};

export default CreateChannelLogo;
