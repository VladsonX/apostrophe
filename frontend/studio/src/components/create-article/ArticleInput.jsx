import CharCountField from "../main-components/CharCountField";
import { useArticleField } from "./ArticleFormContext";
import "./ArticleInput.scss";

const ArticleInput = ({ maxCharCount }) => {
  const [title, setTitle] = useArticleField("title");
  return (
    <CharCountField
      value={title}
      onChange={setTitle}
      maxCharCount={maxCharCount}
      placeholder="Enter the name of your article:"
      className="article-input"
      counterClassName="article-img-descr__counter"
    />
  );
};

export default ArticleInput;
