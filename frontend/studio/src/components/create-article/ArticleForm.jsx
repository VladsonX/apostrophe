import CreateChannelElement from "../create-channel-items/CreateChannelElement";
import ArticleImg from "./ArticleImg";
import ArticleImgDescr, { ArticleImgDescrCounter } from "./ArticleImgDescr";
import ArticleInput from "./ArticleInput";
import ArticleSnippet from "./ArticleSnippet";
import ArticleEditor from "./ArticleEditor";
import { ArticleFormProvider } from "./ArticleFormContext";
import "./ArticleImgDescrWrapper.scss";

// Shared by the create and edit pages. `children` renders extra controls under the editor.
const ArticleForm = ({ article, setField, children }) => (
  <ArticleFormProvider article={article} setField={setField}>
    <CreateChannelElement name="Article Image">
      <span className="create-article-page__context">
        The image of your article will be shown to readers in preview mode
      </span>
      <div className="article-img-descr__wrapper">
        <ArticleImg />
        <ArticleImgDescr maxCharCount={155} />
      </div>
      <ArticleImgDescrCounter maxCharCount={155} />
    </CreateChannelElement>
    <CreateChannelElement name="Article Name">
      <div className="create-article-name__wrapper">
        <ArticleInput maxCharCount={90} />
      </div>
    </CreateChannelElement>
    <CreateChannelElement name="Article Snippet">
      <span className="create-article-page__context">
        Article Snippet will be shown to readers as a preview text
      </span>
      <ArticleSnippet maxCharCount={255} />
    </CreateChannelElement>
    <CreateChannelElement id="articleToolbar" name="Article Text">
      <ArticleEditor />
      {children}
    </CreateChannelElement>
  </ArticleFormProvider>
);

export default ArticleForm;
