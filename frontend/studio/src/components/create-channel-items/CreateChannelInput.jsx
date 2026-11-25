import CharCountField from "../main-components/CharCountField";
import "./CreateChannelInput.scss";

// Controlled text field with a counter. Used for channel and topic name/description.
const CreateChannelInput = ({ value, onChange, placeholder, maxCharCount, multiline = false }) => (
  <CharCountField
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    maxCharCount={maxCharCount}
    multiline={multiline}
    autoGrow={multiline}
    className="channel-settings__input"
    counterClassName="channel-settings__input-counter"
    wrapperClassName="channel-settings__input-wrapper"
  />
);

export default CreateChannelInput;
