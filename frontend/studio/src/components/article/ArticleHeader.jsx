import "./ArticleHeader.scss";
import { CiTimer } from "react-icons/ci";
import { IconContext } from "react-icons";

const ArticleHeader = ({ post }) => {
  return (
    <>
      <h1 className="article-header__title">{post.title}</h1>
      <hr className="article-header__divider" />
      <div className="article-header__meta-wrapper">
        <div className="article-header__published">
          Published {post.createdAt}
        </div>
        <div className="article-header__time-to-read">
          <span className="article-header__time-to-read-text">
            {post.estimatedReadingTime} minute read
          </span>
          <IconContext.Provider
            value={{ size: "1rem", className: "article-header__icon" }}
          >
            <CiTimer />
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
};

export default ArticleHeader;
