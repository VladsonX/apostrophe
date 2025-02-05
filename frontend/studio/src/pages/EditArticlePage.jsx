import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import "./EditChannelPage";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { serverURL } from "../script/server";
import { NavLink } from "react-router";
import SmalSubmitButton from "../components/main-components/SmallSubmitButton";
import Loader from "../components/main-components/Loader";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import ReactQuill from "react-quill";
import Footer from "../components/main-components/Footer";
import ArticleImgDescrWrapper from "../components/create-article/ArticleImgDescrWrapper";
import ArticleInput from "../components/create-article/ArticleInput";
import ArticleSnippet from "../components/create-article/ArticleSnippet";

const EditArticlePage = () => {
  const { channelId, topicId, postId } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState({});
  const [post, setPost] = useState({});
  const [topic, setTopic] = useState({});
  const [articleImgDescr, setArticleImgDescr] = useState();
  const [articleName, setArticleName] = useState();
  const [articleSnippet, setArticleSnippet] = useState();
  const [articleImg, setArticleImg] = useState();
  const [editorContent, setEditorContent] = useState("");
  const [updatedPost, setUpdatedPost] = useState({});
  const [postPublished, setPostPublished] = useState(false);
  const [postDeleted, setPostDeleted] = useState(false);
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
        console.error("Файл не выбран.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        // Загрузка файла на сервер
        const response = await fetch(`${serverURL}/api/v1/media`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Не удалось загрузить изображение на сервер.");
        }

        const uuid = await response.text();
        const imageUrl = `${serverURL}/api/v1/media/${uuid}`;
        console.log("Сгенерированный URL изображения:", imageUrl);

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl);
      } catch (error) {
        console.error("Ошибка при загрузке или вставке изображения:", error);
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
      ["link", "image"], // Image button
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
    const updatedArticle = {
      postId: postId,
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

    console.log(updatedArticle);

    try {
      const response = await fetch(`${serverURL}/api/v1/posts`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedArticle),
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, [channelId, navigate, token]);
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
        setTopic(post.topic);
        setArticleImg(post.thumbnail);
        setArticleImgDescr(post.thumbnailAltText);
        setArticleName(post.title);
        setArticleSnippet(post.postSnippet);
        setEditorContent(post.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, navigate, token]);

  const handleDeleteButton = async () => {
    try {
      const token = getCurrentJwtToken();
      if (!token) {
        setError("User is not authenticated");
        navigate("welcome");
        return;
      }
      const response = fetch(`${serverURL}/api/v1/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPostPublished(true);
      setPostDeleted(true);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
    } catch (error) {}
  };

  return (
    <MainSection>
      {postPublished ? (
        <div className="create-article-page__post-published">
          <p className="create-article-page__post-published-text_big">
            Congratulations!
          </p>
          <p className="create-article-page__post-published-text">
            Your article has been {postDeleted ? "deleted" : "published"}
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
            button={
              <SmalSubmitButton
                onClick={handleSubmitButton}
                text="Update"
                position="absolute"
              />
            }
            // icon={<FaHome />}
            channel={channel}
            topic={topic}
            post={post}
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
                    value={articleImgDescr}
                    imgValue={articleImg}
                    postCharCount={articleImgDescr?.length || 0}
                    maxCharCount="155"
                  />
                </CreateChannelElement>
                <CreateChannelElement name="Article Name">
                  <div className="create-article-name__wrapper">
                    <ArticleInput
                      postCharCount={articleName?.length || 0}
                      setValue={setArticleName}
                      maxCharCount="90"
                      value={articleName}
                    />
                  </div>
                </CreateChannelElement>
                <CreateChannelElement name="Article Snippet">
                  <span className="create-article-page__context">
                    Article Snippet will be shown to readers as a preview text{" "}
                  </span>
                  <ArticleSnippet
                    postCharCount={articleSnippet?.length || 0}
                    maxCharCount="255"
                    setValue={setArticleSnippet}
                    value={articleSnippet}
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
                  <SmalSubmitButton
                    color="red"
                    align="end"
                    text="Detete"
                    onClick={handleDeleteButton}
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

export default EditArticlePage;
