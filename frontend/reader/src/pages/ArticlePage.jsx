import "./ArticlePage.scss";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
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
  const [post, setPost] = useState({});
  const quillRef = useRef(null);

  const navigate = useNavigate();
  const token = getCurrentJwtToken();

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
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavigationBar
            noButton={true}
            aosEffect="zoom-fade-in"
            channel={loading ? "Loading..." : channel ? channel : null}
            topic={loading ? "Loading..." : topic ? topic : null}
            post={loading ? "Loading..." : post ? post : null}
          />
          <MainContainer>
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
          </MainContainer>
        </>
      )}

      <Footer />
    </MainSection>
  );
};

export default CreateArticlePage;
