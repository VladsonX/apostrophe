import "./ArticleImgDescrWrapper.scss";
import ArticleImg from "./ArticleImg";
import ArticleImgDescr from "./ArticleImgDescr";
import { useState } from "react";
import { serverURL } from "../../server";

const ArticleImgDescrWrapper = ({maxCharCount, setValue, setArticleImg}) => {
    const [charCount, setCharCount] = useState();
  return (
    <>
      <div className="article-img-descr__wrapper">
        <ArticleImg customImg={setArticleImg}/>
        <ArticleImgDescr setValue={setValue} setCharactersCount={setCharCount}/>
      </div>
      <span className="article-img-descr__counter">{charCount ? charCount : 0}/{maxCharCount}</span>
    </>
  );
};

export default ArticleImgDescrWrapper;
