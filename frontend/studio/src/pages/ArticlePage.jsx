import { useNavigate, useParams } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import MainContainer from "../components/main-components/MainContainer";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import ArticleHeader from "../components/article/ArticleHeader";
import SmallSubmitButton from "../components/main-components/SmallSubmitButton";
import Footer from "../components/main-components/Footer";
import Loader from "../components/main-components/Loader";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { postsApi } from "../api";
import { mediaUrl } from "../api/client";
import { useApi } from "../hooks/useApi";
import "./ArticlePage.scss";
import "./CustomQuillTheme.scss";

import { FORMATS as QUILL_FORMATS } from "../components/create-article/ArticleEditor";

// Read-only Quill: no toolbar, same formats as the editor.
const QUILL_MODULES = { toolbar: false };

const ArticlePage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data: post, loading, error } = useApi(() => postsApi.get(postId), [postId]);

  return (
    <MainSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ErrorMessage error={error} />
          {post && (
            <>
              <TopNavigationBar
                aosEffect="zoom-fade-in"
                button={
                  <SmallSubmitButton
                    onClick={() => navigate("edit")}
                    text="Edit"
                    position="absolute"
                  />
                }
                channel={post.channel}
                topic={post.topic ?? null}
                post={post}
              />
              <MainContainer>
                <ArticleHeader aosEffect="zoom-fade-in" post={post} />
                <img
                  data-aos="fade-up"
                  className="article-page-thumbnail"
                  src={mediaUrl(post.thumbnail)}
                  alt={post.thumbnailAltText}
                />
                <CreateChannelElement aosEffect="fade-up" id="articleToolbar">
                  <ReactQuill
                    value={post.content}
                    modules={QUILL_MODULES}
                    formats={QUILL_FORMATS}
                    readOnly={true}
                  />
                </CreateChannelElement>
              </MainContainer>
            </>
          )}
        </>
      )}
      <Footer />
    </MainSection>
  );
};

export default ArticlePage;
