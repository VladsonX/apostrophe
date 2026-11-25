import ChannelHeading2 from "./ChannelHeading2";
import "./ChannelLatestArticles.scss";
import ChannelArticle from "./ChannelArticle";

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
      <ChannelHeading2 name={name} number={posts.length} />
      <div className="channel-latest-articles__wrapper">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <ChannelArticle channel={channel} post={post} key={post.postId} />
          ))
        ) : (
          <div
            data-aos="fade-up"
            className="channel-latest-articles__no-articles"
          >
            There's no articles for now :(
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelLatestArticles;
