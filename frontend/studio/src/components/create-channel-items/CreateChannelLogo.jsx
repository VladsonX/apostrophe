import { useState } from "react";
import SmallSubmitButton from "../main-components/SmallSubmitButton";
import ChannelAvatar from "../main-components/ChannelAvatar";
import ErrorMessage from "../main-components/ErrorMessage";
import { mediaApi } from "../../api";
import pickFile from "../../script/pickFile";
import { useChannelForm } from "./ChannelFormContext";
import "./CreateChannelLogo.scss";

const CreateChannelLogo = () => {
  const { channel, setField } = useChannelForm();
  const [error, setError] = useState(null);

  const uploadLogo = async () => {
    const file = await pickFile();
    if (!file) return;
    try {
      setError(null);
      setField("avatar", await mediaApi.upload(file));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <div className="create-channel-logo__wrapper">
        <ChannelAvatar channel={channel} imgClassName="create-channel-logo__img" size="big" />
        <SmallSubmitButton onClick={uploadLogo} text="Add" />
      </div>
      <ErrorMessage error={error} />
    </>
  );
};

export default CreateChannelLogo;
