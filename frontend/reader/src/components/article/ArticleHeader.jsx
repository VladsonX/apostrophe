import "./ArticleHeader.scss";
import { CiTimer } from "react-icons/ci";
import { IconContext } from "react-icons";

const ArticleHeader = () => {
  return (
    <>
      <h1 className="article-header__title">
        The archaeological mystery of Stonehenge's long-lost megaliths
      </h1>
      <hr className="article-header__divider" />
      <div className="article-header__meta-wrapper">
        <div className="article-header__published">
          Published 7:51 AM EST, Thu December 19, 2024
        </div>
        <div className="article-header__time-to-read">
          <span className="article-header__time-to-read-text">
            5 minute read
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
