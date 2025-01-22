import ChannelHeading2 from "./ChannelHeading2";
import "./ChannelLatestArticles.scss";
import ChannelArticle from "./ChannelArticle";
import AddChannelArticle from "./AddChannelArticle";

const ChannelLatestArticles = ({ name, channel, posts, type, topicId }) => {
  return (
    <div className="channel-latest-articles">
      <ChannelHeading2 name={name} />
      <div className="channel-latest-articles__wrapper">
        {channel.topicsEnabled && type==='Channel' ? (<></>) : (<AddChannelArticle />)}
        {type === "Channel"
          ? posts
              // .filter((post) => post.topic.length === 0)
              .map((post) => (
                <ChannelArticle
                  channel={channel}
                  post={post}
                  key={post.postId}
                />
              ))
          : posts
              .filter(post => (post.topic.topicId === topicId))
              .map((post) => (
                <ChannelArticle
                  channel={channel}
                  post={post}
                  key={post.postId}
                />
              ))}
      </div>
    </div>
  );
};

export default ChannelLatestArticles;
