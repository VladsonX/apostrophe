import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import MainContainer from "../components/main-components/MainContainer";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";
import ErrorMessage from "../components/main-components/ErrorMessage";
import ArticleForm from "../components/create-article/ArticleForm";
import { toApiArticle, useArticleFormState } from "../components/create-article/ArticleFormContext";
import { postsApi } from "../api";
import { useApi } from "../hooks/useApi";
import { PublishedMessage } from "./CreateArticlePage";
import "./CreateArticlePage.scss";
import "./EditArticlePage.scss";

const EditArticlePage = () => {
  const { postId } = useParams();
  const { data: post, loading, error } = useApi(() => postsApi.get(postId), [postId]);
  const { article, setArticle, setField } = useArticleFormState();
  const [saveError, setSaveError] = useState(null);
  const [result, setResult] = useState(null); // "updated" | "deleted"

  // Fill the form once the post has loaded.
  useEffect(() => {
    if (post) setArticle(post);
  }, [post, setArticle]);

  const run = async (action, request) => {
    setSaveError(null);
    try {
      await request();
      setResult(action);
    } catch (err) {
      setSaveError(err);
    }
  };

  const update = () =>
    run("updated", () =>
      postsApi.update({
        ...toApiArticle(article),
        postId,
        channel: { channelId: post.channel.channelId },
        ...(post.topic && { topic: { topicId: post.topic.topicId } }),
      }),
    );

  const remove = () => {
    if (window.confirm("Delete this article? This cannot be undone.")) {
      run("deleted", () => postsApi.remove(postId));
    }
  };

  if (result) {
    return (
      <MainSection>
        <PublishedMessage action={result} />
        <Footer />
      </MainSection>
    );
  }

  return (
    <MainSection>
      <TopNavigationBar
        button={<SmallSubmitButton onClick={update} text="Update" position="absolute" />}
        channel={post?.channel}
        topic={post?.topic}
        post={post}
      />
      <MainContainer>
        <ErrorMessage error={error ?? saveError} />
        {loading ? (
          <Loader />
        ) : (
          post && (
            <ArticleForm article={article} setField={setField}>
              <SmallSubmitButton color="red" align="end" text="Delete" onClick={remove} />
            </ArticleForm>
          )
        )}
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default EditArticlePage;
