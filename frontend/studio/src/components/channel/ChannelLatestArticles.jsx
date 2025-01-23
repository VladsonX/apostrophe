import ChannelHeading2 from "./ChannelHeading2";
import "./ChannelLatestArticles.scss";
import ChannelArticle from "./ChannelArticle";
import AddChannelArticle from "./AddChannelArticle";

const ChannelLatestArticles = ({
  name,
  channel,
  posts,
  type,
  topicId,
  aosEffect,
}) => {
  return (
    <div className="channel-latest-articles">
      <ChannelHeading2 name={name} />
      <div className="channel-latest-articles__wrapper">
        {channel.topicsEnabled && type === "Channel" ? (
          <></>
        ) : (
          <AddChannelArticle aosEffect={aosEffect} />
        )}
        {type === "Channel" ? (
          posts && posts.length > 0 ? (
            posts.map((post) => (
              <ChannelArticle channel={channel} post={post} key={post.postId} />
            ))
          ) : (
            <div data-aos='fade-up' className="channel-latest-articles__no-articles">
              There's no articles for now :(
            </div>
          )
        ) : posts && posts.length > 0 ? (
          posts
            .filter((post) => post.topic.topicId === topicId)
            .map((post) => (
              <ChannelArticle channel={channel} post={post} key={post.postId} />
            ))
        ) : (
          <div data-aos='fade-up' className="channel-latest-articles__no-articles">
            There's no articles for now :(
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelLatestArticles;
