import "./CreateChannelLogo.scss";
import SmallSubmitButton from "../main-components/SmallSubmitButton";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";

import { IconContext } from "react-icons";

const CreateChannelLogo = ({ isLoading, channel, customImg }) => {
  const [image, setImage] = useState(channel.avatar || "");

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
        const response = await fetch("http://54.165.53.22:9090/api/v1/media", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const uuid = await response.text();
        console.log("uuid:", uuid);
        const imageUrl = `http://54.165.53.22:9090/api/v1/media/${uuid}`;
        setImage(imageUrl);
        customImg(imageUrl)
        console.log(image);
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
        ) : (
          <div
            className="channel-list-item__logo channel-list-item__logo-placeholder channel-list-item__logo-placeholder_big"
            style={{ backgroundColor: channel.logoPlaceholderColor }}
          >
            <span>{channel.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <SmallSubmitButton onClick={handleFileChange} text="Add" />
      </div>
    </>
  );
};

export default CreateChannelLogo;
