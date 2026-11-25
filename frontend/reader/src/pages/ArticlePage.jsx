import { useParams } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import MainContainer from "../components/main-components/MainContainer";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import ArticleHeader from "../components/article/ArticleHeader";
import Footer from "../components/main-components/Footer";
import Loader from "../components/main-components/Loader";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { postsApi } from "../api";
import { mediaUrl } from "../api/client";
import { useApi } from "../hooks/useApi";
import "./ArticlePage.scss";
import "./CustomQuillTheme.scss";

// Read-only Quill: no toolbar, only the formats the studio editor can produce.
const QUILL_MODULES = { toolbar: false };
const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "link",
  "image",
  "blockquote",
  "align",
];

const ArticlePage = () => {
  const { postId } = useParams();
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
                noButton={true}
                aosEffect="zoom-fade-in"
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
