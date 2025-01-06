import { useState } from "react";
import "./CreateChannelInput.scss";
import CreateChannelTitle from "./CreateChannelTitle";

const ChannelSettingsInput = ({ name, placeholder, maxCharCount, type }) => {
  const [charCount, setCharCount] = useState();
  const [value, setValue] = useState("");

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setValue(textarea.value);
  };
  return (
    <div className="channel-settings__element">
        <CreateChannelTitle name={name} />
      <div className="channel-settings__input-wrapper">
        {type === "description" ? (
          <textarea
            onChange={(e) => {
              setCharCount(e.target.value.length);
            }}
            onInput={handleInput}
            maxlength={maxCharCount}
            placeholder={placeholder}
            className="channel-settings__input"
            type="text"
          ></textarea>
        ) : (
          <input
            onChange={(e) => setCharCount(e.target.value.length)}
            maxlength={maxCharCount}
            placeholder={placeholder}
            className="channel-settings__input"
            type="text"
          />
        )}

        <span className="channel-settings__input-counter">
          {charCount ? charCount : 0}/{maxCharCount}
        </span>
      </div>
    </div>
  );
};

export default ChannelSettingsInput;
