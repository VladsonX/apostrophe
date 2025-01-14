
import "./ArticleImgDescr.scss";

const ArticleImgDescr = ({setCharactersCount, setValue}) => {
  return (
    <>
      <textarea
      maxLength='155'
        onInput={(e) => {
            setCharactersCount(e.target.value.length);
            setValue(e.target.value)
        }}
        placeholder="Image Description:"
        className="article-img-descr"
        name=""
        id=""
      ></textarea>
    </>
  );
};

export default ArticleImgDescr;
