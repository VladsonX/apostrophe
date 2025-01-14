import "./ArticleInput.scss";
import { useState } from "react";

const ArticleInput = ({maxCharCount, setValue}) => {
    const [charCount, setCharCount] = useState();
  return (
    <>
      <input  
      maxLength='90'
      placeholder="Enter the name of your article:"
      onInput={(e) => {
        setCharCount(e.target.value.length);
        setValue(e.target.value);
      }}
      className="article-input" 
      type="text" />
      <span className="article-img-descr__counter">
        {charCount ? charCount : 0}/{maxCharCount}
      </span>
    </>
  );
};

export default ArticleInput;
