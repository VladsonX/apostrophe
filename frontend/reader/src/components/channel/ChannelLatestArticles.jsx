import ChannelHeading2 from "./ChannelHeading2";
import "./ChannelLatestArticles.scss";
import ChannelArticle from "./ChannelArticle";

const ChannelLatestArticles = ({ name, posts }) => {
  return (
    <div className="channel-latest-articles">
      <ChannelHeading2 name={name} number={posts?.length ?? 0} />
      <div className="channel-latest-articles__wrapper">
        {posts && posts.length > 0 ? (
          posts.map((post) => <ChannelArticle post={post} key={post.postId} />)
        ) : (
          <div data-aos="fade-up" className="channel-latest-articles__no-articles">
            There&apos;s no articles for now :(
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelLatestArticles;
