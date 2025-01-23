import "./ArticleInput.scss";
import { useState } from "react";

const ArticleInput = ({maxCharCount, setValue, postCharCount, value}) => {
    const [charCount, setCharCount] = useState(postCharCount);
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
      value={value && value}
      type="text" />
      <span className="article-img-descr__counter">
        {charCount ? charCount : 0}/{maxCharCount}
      </span>
    </>
  );
};

export default ArticleInput;
