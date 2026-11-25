/* eslint-disable react-refresh/only-export-components -- context, hooks and helpers live together */
import { createContext, useCallback, useContext, useState } from "react";

export const EMPTY_ARTICLE = {
  title: "",
  postSnippet: "",
  thumbnail: null,
  thumbnailAltText: "",
  content: "",
};

// The API rejects blank optional fields, so empty strings are sent as null.
export const toApiArticle = ({ title, postSnippet, thumbnail, thumbnailAltText, content }) => ({
  title,
  content,
  thumbnail: thumbnail || null,
  postSnippet: postSnippet?.trim() ? postSnippet : null,
  thumbnailAltText: thumbnailAltText?.trim() ? thumbnailAltText : null,
});

// Form state lives in the page; nested fields read and update it through context
// instead of receiving value/setValue props through every wrapper component.
const ArticleFormContext = createContext(null);

export const useArticleFormState = (initialArticle = EMPTY_ARTICLE) => {
  const [article, setArticle] = useState(initialArticle);
  const setField = useCallback(
    (field, value) => setArticle((current) => ({ ...current, [field]: value })),
    [],
  );
  return { article, setArticle, setField };
};

export const ArticleFormProvider = ({ article, setField, children }) => (
  <ArticleFormContext.Provider value={{ article, setField }}>
    {children}
  </ArticleFormContext.Provider>
);

export const useArticleField = (field) => {
  const context = useContext(ArticleFormContext);
  if (!context) throw new Error("useArticleField must be used inside <ArticleFormProvider>");
  return [context.article[field] ?? "", (value) => context.setField(field, value)];
};
