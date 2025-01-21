import { useState } from "react";
import "./CreateChannelInput.scss";

const CreateChannelInput = ({
  channel = {},
  placeholder,
  maxCharCount,
  type,
  name,
  descr,
}) => {
  const [areaValue, setAreaValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState(
    channel.description || ""
  );
  const [nameValue, setNameValue] = useState(channel.name || "");
  const [charCount, setCharCount] = useState(
    type === "description" ? descriptionValue.length : nameValue.length
  );

  const handleInputHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setAreaValue(textarea.value);
  };
  const handleTextArea = (e) => {
    setDescriptionValue(e.target.value);
    descr(e.target.value);
  };
  const handleInput = (e) => {
    setNameValue(e.target.value);
    name(e.target.value);
  };

  return (
    <div className="channel-settings__input-wrapper">
      {type === "description" ? (
        <textarea
          onChange={(e) => {
            setCharCount(e.target.value.length);
          }}
          onInput={(e) => {
            handleInputHeight(e);
            handleTextArea(e);
          }}
          maxLength={maxCharCount}
          placeholder={placeholder}
          className="channel-settings__input"
          type="text"
          value={descriptionValue}

        ></textarea>
      ) : (
        <input

          onChange={(e) => setCharCount(e.target.value.length)}
          onInput={(e) => handleInput(e)}
          maxLength={maxCharCount}
          placeholder={placeholder}
          className="channel-settings__input"
          type="text"
          value={nameValue}
        />
      )}
      <span className="channel-settings__input-counter">
        {charCount ? charCount : 0}/{maxCharCount}
      </span>
    </div>
  );
};

export default CreateChannelInput;
