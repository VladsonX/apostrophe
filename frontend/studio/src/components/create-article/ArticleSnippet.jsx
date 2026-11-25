import CharCountField from "../main-components/CharCountField";
import { useArticleField } from "./ArticleFormContext";
import "./ArticleSnippet.scss";

const ArticleSnippet = ({ maxCharCount }) => {
  const [snippet, setSnippet] = useArticleField("postSnippet");
  return (
    <CharCountField
      multiline
      value={snippet}
      onChange={setSnippet}
      maxCharCount={maxCharCount}
      className="article-snippet"
      counterClassName="article-img-descr__counter"
    />
  );
};

export default ArticleSnippet;
