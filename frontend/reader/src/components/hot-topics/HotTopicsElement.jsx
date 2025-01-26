import HotTopicsCard from "./HotTopicsCard";
import "./HotTopicsElement.scss";
import HotTopicsSlider from "./HotTopicsSlider";
import HotTopicsTitle from "./HotTopicsTitle";

const HotTopicsElement = ({ title, posts}) => {
  if (!posts) return null;
  return (
    <div className="hot-topics">
      <HotTopicsTitle title={title} />
      <HotTopicsSlider>
        {posts.map(post => (
          <HotTopicsCard post={post} key={post.postId}/>
        ))}
      </HotTopicsSlider>
    </div>
  );
};

export default HotTopicsElement;
