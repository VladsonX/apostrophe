import { NavLink } from "react-router";
import "./ReadMoreButton.scss";

const ReadMoreButton = ({onClick, post}) => {
  return (
    <NavLink to={`readarticle/${post.postId}`} onClick={onClick} className="channel-latest-articles__article-read-more">
      Read more
    </NavLink>
  );
};

export default ReadMoreButton;
