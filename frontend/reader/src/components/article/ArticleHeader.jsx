import "./ArticleHeader.scss";
import { CiTimer } from "react-icons/ci";
import { IconContext } from "react-icons";
import convertEstimatedReadingTime from "../../script/EstimatedReadingTImeConverter";
import reformateDate from "../../script/reformateDate";

const ArticleHeader = ({ post, aosEffect }) => {
  return (
    <>
      <h1 data-aos={aosEffect} className="article-header__title">{post.title}</h1>
      <hr className="article-header__divider" />
      <div className="article-header__meta-wrapper">
        <div className="article-header__published">
          Published {reformateDate(post.createdAt)}
        </div>
        <div data-aos={aosEffect} className="article-header__time-to-read">
          <span className="article-header__time-to-read-text">
            {convertEstimatedReadingTime(post.estimatedReadingTime)}
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
