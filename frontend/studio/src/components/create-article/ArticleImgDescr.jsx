import CharCountField, { CharCounter } from "../main-components/CharCountField";
import { useArticleField } from "./ArticleFormContext";
import "./ArticleImgDescr.scss";

const ArticleImgDescr = ({ maxCharCount }) => {
  const [altText, setAltText] = useArticleField("thumbnailAltText");
  return (
    <CharCountField
      multiline
      value={altText}
      onChange={setAltText}
      maxCharCount={maxCharCount}
      placeholder="Image Description:"
      className="article-img-descr"
      hideCounter
    />
  );
};

// Rendered below the image + description row, as in the original layout.
export const ArticleImgDescrCounter = ({ maxCharCount }) => {
  const [altText] = useArticleField("thumbnailAltText");
  return <CharCounter value={altText} max={maxCharCount} className="article-img-descr__counter" />;
};

export default ArticleImgDescr;
