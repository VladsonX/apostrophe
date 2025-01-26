import "./ChannelHeading2.scss";

const ChannelHeading2 = ({ name, number }) => {
  return (
    <h2 className="channel-heading2">
      {" "}
      {name}{" "}
      {number ? (
        <span className="create-channel__title_number">[{number}]</span>
      ) : (
        <></>
      )}
    </h2>
  );
};

export default ChannelHeading2;
