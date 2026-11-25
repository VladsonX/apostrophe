import { useState } from "react";
import { NavLink, useParams } from "react-router";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import MainContainer from "../components/main-components/MainContainer";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";
import ErrorMessage from "../components/main-components/ErrorMessage";
import ArticleForm from "../components/create-article/ArticleForm";
import { toApiArticle, useArticleFormState } from "../components/create-article/ArticleFormContext";
import { channelsApi, postsApi } from "../api";
import { useApi } from "../hooks/useApi";
import "./CreateArticlePage.scss";

export const PublishedMessage = ({ action }) => (
  <div className="create-article-page__post-published">
    <p className="create-article-page__post-published-text_big">Congratulations!</p>
    <p className="create-article-page__post-published-text">Your article has been {action}</p>
    <p className="create-article-page__post-published-text">
      Go to{" "}
      <NavLink to="/" className="create-article-page__post-published-link">
        Main Page
      </NavLink>
    </p>
  </div>
);

const CreateArticlePage = () => {
  const { channelId, topicId } = useParams();
  const { data: channel, loading, error } = useApi(() => channelsApi.get(channelId), [channelId]);
  const { article, setField } = useArticleFormState();
  const [saveError, setSaveError] = useState(null);
  const [published, setPublished] = useState(false);

  const topic = topicId ? channel?.topics.find((t) => t.topicId === topicId) : null;

  const publish = async () => {
    setSaveError(null);
    try {
      await postsApi.create({
        ...toApiArticle(article),
        channel: { channelId },
        ...(topicId && { topic: { topicId } }),
      });
      setPublished(true);
    } catch (err) {
      setSaveError(err);
    }
  };

  if (published) {
    return (
      <MainSection>
        <PublishedMessage action="published" />
        <Footer />
      </MainSection>
    );
  }

  return (
    <MainSection>
      <TopNavigationBar
        channel={channel}
        topic={topic}
        button={<SmallSubmitButton onClick={publish} text="Publish" position="absolute" />}
      />
      <MainContainer>
        <ErrorMessage error={error ?? saveError} />
        {loading ? <Loader /> : <ArticleForm article={article} setField={setField} />}
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default CreateArticlePage;
