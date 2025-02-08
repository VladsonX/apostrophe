import "./CreateArticlePage.scss";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import SmalSubmitButton from "../components/main-components/SmallSubmitButton";
import MainContainer from "../components/main-components/MainContainer";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import { serverURL } from "../script/server";
import ArticleImgDescrWrapper from "../components/create-article/ArticleImgDescrWrapper";
import ArticleInput from "../components/create-article/ArticleInput";
import ArticleSnippet from "../components/create-article/ArticleSnippet";
import "./CustomQuillTheme.scss";
import "../components/create-article/ArticleText.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "../components/main-components/Loader";
import Footer from "../components/main-components/Footer";

const CreateArticlePage = () => {
  const { channelId, topicId } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState({});
  const [articleImgDescr, setArticleImgDescr] = useState();
  const [articleName, setArticleName] = useState();
  const [articleSnippet, setArticleSnippet] = useState();
  const [articleImg, setArticleImg] = useState();
  const [updatedPost, setUpdatedPost] = useState({});
  const [postPublished, setPostPublished] = useState(false);
  const [topic, setTopic] = useState();
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef(null);

  const navigate = useNavigate();
  const token = getCurrentJwtToken();

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(`${serverURL}/api/v1/media`, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Failed to upload the image to the server.");
        }
        const uuid = await response.text();
        const imageUrl = `${serverURL}/api/v1/media/${uuid}`;

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl);
      } catch (error) {
      }
    };
  };

  const blockQuoteHandler = () => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    const quote = `
    <blockquote> 

    </blockquote>
        <p class='ql-align-right'>Author</p>
    `;
    quill.clipboard.dangerouslyPasteHTML(range.index, quote);
    quill.setSelection(range.index + 10);
  };

  const modules = {
    toolbar: [
      [
        { header: "1" },
        { header: "2" },
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
      ],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"], 
    ],
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
    setTimeout(() => {
      if (quillRef.current) {
        const quillEditor = quillRef.current.getEditor();
        const quill = quillRef.current.getEditor();
        const toolbar = quill.getModule("toolbar");

        console.log("Toolbar", toolbar);
        toolbar.addHandler("image", imageHandler);
        toolbar.addHandler("blockquote", blockQuoteHandler);
      }
    }, 500);
  }, []);

  const handleSubmitButton = async () => {
    const token = getCurrentJwtToken();
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      navigate("welcome");
      return;
    }
    const newArticle = {
      content: editorContent,
      postSnippet: articleSnippet,
      title: articleName,
      thumbnail: articleImg,
      thumbnailAltText: articleImgDescr,
      channel: {
        channelId: channelId,
      },
      topic: topicId ? { topicId: topicId } : {},
    };

    console.log(newArticle);

    try {
      const response = await fetch(`${serverURL}/api/v1/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newArticle),
      });
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const newPost = await response.text();
      setUpdatedPost(newPost);
      setPostPublished(true);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchChannels = async () => {
      const token = getCurrentJwtToken();
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("welcome");
        return;
      }
      try {
        const response = await fetch(
          `${serverURL}/api/v1/channels/${channelId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch channels");
        }
        const channel = await response.json();
        setChannel(channel);
        setTopic(
          topicId
            ? channel.topics.find((elem) => elem.topicId === topicId)
            : null
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, [topicId, channelId, navigate, token]);

  return (
    <MainSection>
      {postPublished ? (
        <div className="create-article-page__post-published">
          <p className="create-article-page__post-published-text_big">
            Congratulations!
          </p>
          <p className="create-article-page__post-published-text">
            Your article has been published
          </p>
          <p className="create-article-page__post-published-text">
            Go to{" "}
            <NavLink
              to={"/"}
              className="create-article-page__post-published-link"
            >
              Main Page
            </NavLink>
          </p>
        </div>
      ) : (
        <>
          {" "}
          <TopNavigationBar
            channel={channel ? channel : null}
            topic={topic ? topic : null}
            button={
              <SmalSubmitButton
                onClick={handleSubmitButton}
                text="Publish"
                position="absolute"
              />
            }
          />
          <MainContainer>
            {loading ? (
              <Loader />
            ) : (
              <>
                <CreateChannelElement name="Article Image">
                  <span className="create-article-page__context">
                    The image of your article will be shown to readers in
                    preview mode
                  </span>
                  <ArticleImgDescrWrapper
                    setArticleImg={setArticleImg}
                    setValue={setArticleImgDescr}
                    maxCharCount="155"
                  />
                </CreateChannelElement>
                <CreateChannelElement name="Article Name">
                  <div className="create-article-name__wrapper">
                    <ArticleInput setValue={setArticleName} maxCharCount="90" />
                  </div>
                </CreateChannelElement>
                <CreateChannelElement name="Article Snippet">
                  <span className="create-article-page__context">
                    Article Snippet will be shown to readers as a preview text{" "}
                  </span>
                  <ArticleSnippet
                    maxCharCount="255"
                    setValue={setArticleSnippet}
                  />
                </CreateChannelElement>
                <CreateChannelElement id="articleToolbar" name="Article Text">
                  <ReactQuill
                    value={editorContent}
                    onChange={setEditorContent}
                    ref={quillRef}
                    modules={modules}
                    formats={formats}
                  />
                </CreateChannelElement>
              </>
            )}
          </MainContainer>
        </>
      )}

      <Footer />
    </MainSection>
  );
};

export default CreateArticlePage;
