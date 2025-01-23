import ChannelHeading2 from "./ChannelHeading2";
import "./ChannelLatestArticles.scss";
import ChannelArticle from "./ChannelArticle";

const ChannelLatestArticles = ({ name, posts }) => {
  return (
    <div className="channel-latest-articles">
      <ChannelHeading2 name={name} />
      <div className="channel-latest-articles__wrapper">
        {posts ? (
          posts.map((post) => {
            <ChannelArticle post={post} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ChannelLatestArticles;
