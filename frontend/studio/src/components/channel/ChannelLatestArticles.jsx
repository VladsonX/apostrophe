import ChannelHeading2 from "./ChannelHeading2";
import "./ChannelLatestArticles.scss";
import ChannelArticle from "./ChannelArticle";
import AddChannelArticle from "./AddChannelArticle";

const ChannelLatestArticles = ({ name, channel }) => {
  return (
    <div className="channel-latest-articles">
      <ChannelHeading2 name={name} />
      <div className="channel-latest-articles__wrapper">
        <AddChannelArticle />
        <ChannelArticle channel={channel} />
        <ChannelArticle channel={channel} />
        <ChannelArticle channel={channel} />
        <ChannelArticle channel={channel} />
        <ChannelArticle channel={channel} />
        <ChannelArticle channel={channel} />

        
      </div>
    </div>
  );
};

export default ChannelLatestArticles;
