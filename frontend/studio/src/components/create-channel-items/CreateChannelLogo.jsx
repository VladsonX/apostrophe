import "./CreateChannelLogo.scss";
import SmallSubmitButton from "../main-components/SmallSubmitButton";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";
import { serverURL } from "../../script/server";

import { IconContext } from "react-icons";

const CreateChannelLogo = ({ isLoading, channel = {}, customImg }) => {
  const imageUrl = channel.avatar ? `${serverURL}/api/v1/media/${channel.avatar}` : null;
  const [image, setImage] = useState(imageUrl || "");

  const handleFileChange = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("id", "imgLoader");
    input.setAttribute("style", "display: none");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`${serverURL}/api/v1/media`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const uuid = await response.text();
        console.log("uuid:", uuid);
        const imageUrl = `${serverURL}/api/v1/media/${uuid}`;
        setImage(imageUrl);
        customImg(uuid)

      } catch (error) {
        console.error(error);
      }
    };
  };

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
        ) : channel.avatar ? (
          <img className="create-channel-logo__img" src={image} alt={channel.name} />
        ) : image ? (
          <img className="create-channel-logo__img" src={image} alt={channel.name} />
        ) : channel.name ? (
          <div
            className="channel-list-item__logo channel-list-item__logo-placeholder channel-list-item__logo-placeholder_big"
            style={{ backgroundColor: channel.logoPlaceholderColor }}
          >
            <span>{channel.name.charAt(0).toUpperCase()}</span>
          </div>
        ) : (<div className="create-channel-logo__placeholder">
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
        </div>)}
        <SmallSubmitButton onClick={handleFileChange} text="Add" />
      </div>
    </>
  );
};

export default CreateChannelLogo;
