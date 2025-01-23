import "./ArticleImgDescrWrapper.scss";
import ArticleImg from "./ArticleImg";
import ArticleImgDescr from "./ArticleImgDescr";
import { useState } from "react";
import { serverURL } from "../../server";

const ArticleImgDescrWrapper = ({maxCharCount, setValue, setArticleImg, value, imgValue, postCharCount}) => {
    const [charCount, setCharCount] = useState(postCharCount && postCharCount);
  return (
    <>
      <div className="article-img-descr__wrapper">
        <ArticleImg customImg={setArticleImg} postImg={imgValue}/>
        <ArticleImgDescr setValue={setValue} postImgDescr={value} setCharactersCount={setCharCount}/>
      </div>
      <span className="article-img-descr__counter">{charCount ? charCount : 0}/{maxCharCount}</span>
    </>
  );
};

export default ArticleImgDescrWrapper;
