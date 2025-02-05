import "./ArticlePage.scss";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import SmalSubmitButton from "../components/main-components/SmallSubmitButton";
import MainContainer from "../components/main-components/MainContainer";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import { serverURL } from "../script/server";
import "./CustomQuillTheme.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "../components/main-components/Loader";
import ArticleHeader from "../components/article/ArticleHeader";
import Footer from "../components/main-components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const CreateArticlePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);
  const { channelId, topicId, postId } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState({});
  const [topic, setTopic] = useState({});
  const [articleImgDescr, setArticleImgDescr] = useState();
  const [artilceName, setArticleName] = useState();
  const [articleSnippet, setArticleSnippet] = useState();
  const [post, setPost] = useState({});

  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef(null);

  const navigate = useNavigate();
  const token = getCurrentJwtToken();

  const blockQuoteHandler = () => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    const quote = `
    <blockquote> 
    </blockquote>
    <p class='ql-align-right'>Author</p>`;
    quill.clipboard.dangerouslyPasteHTML(range.index, quote);
    quill.setSelection(range.index + 10);
  };

  const modules = {
    toolbar: false,
  };

  const formats = [
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

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule("toolbar");
      const options = quill.getModule("options");

      if (toolbar) {
        // toolbar.addHandler("image", imageHandler);
        toolbar.addHandler("blockquote", blockQuoteHandler);
      }
    }
  }, []);

  const handleSubmitButton = () => {
    navigate(`editarticle/${postId}`);
  };

  useEffect(() => {
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      navigate("welcome");
      return;
    }
    const fetchPost = async () => {
      const token = getCurrentJwtToken();
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("welcome");
        return;
      }

      try {
        const response = await fetch(`${serverURL}/api/v1/posts/${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const post = await response.json();
        setPost(post);
        setChannel(post.channel);
        setTopic(post.topic ? post.topic : null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, navigate, token]);

  return (
    <MainSection>
      <TopNavigationBar
        aosEffect="zoom-fade-in"
        button={
          <SmalSubmitButton
            onClick={handleSubmitButton}
            text="Edit"
            position="absolute"
          />
        }
        // icon={<FaHome />}
        channel={loading ? "Loading..." : channel ? channel : null}
        topic={loading ? "Loading..." : topic ? topic : null}
        post={loading ? "Loading..." : post ? post : null}
      />
      <MainContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ArticleHeader aosEffect="zoom-fade-in" post={post} />

            <img
              data-aos="fade-up"
              className="article-page-thumbnail"
              src={`${serverURL}/api/v1/media/${post.thumbnail}`}
              alt={post.thumbnailAltText}
            />
            <CreateChannelElement aosEffect="fade-up" id="articleToolbar">
              <ReactQuill
                value={post.content}
                ref={quillRef}
                modules={modules}
                formats={formats}
                readOnly={true}
              />
            </CreateChannelElement>
          </>
        )}
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default CreateArticlePage;
