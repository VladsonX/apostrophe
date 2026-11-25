import { useState } from "react";
import "./ArticleSnippet.scss";

const ArticleSnippet = ({ maxCharCount, setValue, postCharCount, value }) => {
  const [charCount, setCharCount] = useState(postCharCount && postCharCount);
  return (
    <>
      <textarea
        onInput={(e) => {
          setValue(e.target.value);
          setCharCount(e.target.value.length);
        }}
        maxLength={maxCharCount}
        className="article-snippet"
        name=""
        id=""
        value={value && value}
      ></textarea>
      <span className="article-img-descr__counter">
        {charCount ? charCount : 0}/{maxCharCount}
      </span>
    </>
  );
};

export default ArticleSnippet;
