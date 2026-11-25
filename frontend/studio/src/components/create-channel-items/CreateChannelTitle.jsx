import "./CreateChannelTitle.scss";

const CreateChannelTitle = ({ name, number }) => {
  return (
    <p className="create-channel__title ">
      {name} {number ? <span className="create-channel__title_number">[{number}]</span> : <></>}
    </p>
  );
};

export default CreateChannelTitle;
