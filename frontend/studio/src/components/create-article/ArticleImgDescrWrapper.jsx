import "./ArticleImgDescrWrapper.scss";
import ArticleImg from "./ArticleImg";
import ArticleImgDescr from "./ArticleImgDescr";
import { useState } from "react";

const ArticleImgDescrWrapper = ({maxCharCount, setValue}) => {
    const [charCount, setCharCount] = useState();
  return (
    <>
      <div className="article-img-descr__wrapper">
        <ArticleImg />
        <ArticleImgDescr setValue={setValue} setCharactersCount={setCharCount}/>
      </div>
      <span className="article-img-descr__counter">{charCount ? charCount : 0}/{maxCharCount}</span>
    </>
  );
};

export default ArticleImgDescrWrapper;
