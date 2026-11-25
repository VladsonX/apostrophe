import ChannelHeading2 from "./ChannelHeading2";
import ChannelArticle from "./ChannelArticle";
import AddChannelArticle from "./AddChannelArticle";
import "./ChannelLatestArticles.scss";

// Pages decide which posts to show and whether a new article can be added here
// (in topic mode articles are created inside a topic, not on the channel page).
// All posts on a page belong to `channel`, which already has its placeholder colour.
const ChannelLatestArticles = ({ name, channel, posts = [], canAddArticle = false, aosEffect }) => (
  <div className="channel-latest-articles">
    <ChannelHeading2 name={name} />
    <div className="channel-latest-articles__wrapper">
      {canAddArticle && <AddChannelArticle aosEffect={aosEffect} />}
      {posts.length > 0 ? (
        posts.map((post) => <ChannelArticle channel={channel} post={post} key={post.postId} />)
      ) : (
        <div data-aos="fade-up" className="channel-latest-articles__no-articles">
          There&apos;s no articles for now :(
        </div>
      )}
    </div>
  </div>
);

export default ChannelLatestArticles;
