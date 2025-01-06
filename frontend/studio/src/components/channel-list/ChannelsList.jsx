
import "./ChannelsList.scss";

const ChannelsList = ({ children, type }) => {
  return <ul 
  className={type ==='small' ? 'channels-list_small' : "channels-list"}>{children}</ul>;
};

export default ChannelsList;
