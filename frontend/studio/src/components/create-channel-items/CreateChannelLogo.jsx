import "./CreateChannelLogo.scss";
import SmallSubmitButton from "../main-components/SmallSubmitButton";
import CreateChannelTitle from "./CreateChannelTitle";
import { CiImageOn } from "react-icons/ci";

import { IconContext } from "react-icons";

const CreateChannelLogo = ({ isLoading, logo, name }) => {
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
          <img src={logo} alt={name} />
        )}
        <SmallSubmitButton text="Add" />
      </div>
    </>
  );
};

export default CreateChannelLogo;
