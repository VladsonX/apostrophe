import "./CreateArticlePage.scss";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import SmalSubmitButton from "../components/main-components/SmallSubmitButton";
import { FaHome } from "react-icons/fa";
import MainContainer from "../components/main-components/MainContainer";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import { serverURL } from "../server";
import ArticleImgDescrWrapper from "../components/create-article/ArticleImgDescrWrapper";
import ArticleInput from "../components/create-article/ArticleInput";
import ArticleSnippet from "../components/create-article/ArticleSnippet";
import "./CustomQuillTheme.scss";
// import ArticleText from "../components/create-article/ArticleText";
import "../components/create-article/ArticleText.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateArticlePage = () => {
  const { id } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState({});
  const [articleImgDescr, setArticleImgDescr] = useState();
  const [artilceName, setArticleName] = useState();
  const [articleSnippet, setArticleSnippet] = useState();

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
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://54.165.53.22:9090/api/v1/media", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const uuid = await response.text();
        const imageUrl = `http://54.165.53.22:9090/api/v1/media/${uuid}`;

        // Insert image URL in the editor
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl);

        // Access the inserted image and set the alt attribute
        const image = quill.root.querySelector(`img[src="${imageUrl}"]`);
        if (image) {
          image.setAttribute("alt", uuid);
        }
      } catch (error) {
        console.error(error);
      }
    };
  };

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
    const quill = quillRef.current.getEditor();
    const toolbar = quill.getModule("toolbar");
    toolbar.addHandler("image", imageHandler);
    toolbar.addHandler("blockquote", blockQuoteHandler);
  }, []);

  const handleSubmit = () => {
    console.log("SUBMIT");
    console.log(editorContent);
  };

  useEffect(() => {
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      navigate("welcome");
      return;
    }
    const fetchChannels = async () => {
      const token = getCurrentJwtToken();
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("welcome");
        return;
      }

      try {
        const response = await fetch(`${serverURL}/api/v1/channels/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch channels");
        }

        const channel = await response.json();
        // enrichChannelsWithLogoPlaceholderBackground([channel]);
        setChannel(channel);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, [id, navigate, token]);

  return (
    <MainSection>
      <TopNavigationBar
        button={
          <SmalSubmitButton
            // onClick={handleSubmitButton}
            text="Edit"
            position="absolute"
          />
        }
        icon={<FaHome />}
        name={`Your Channel: ${channel.name}`}
      />
      <MainContainer>
        <CreateChannelElement name="Article Image">
          <span className="create-article-page__context">
            The image of your article will be shown to readers in preview mode
          </span>
          <ArticleImgDescrWrapper
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
          <ArticleSnippet maxCharCount="255" setValue={setArticleSnippet} />
        </CreateChannelElement>
        <CreateChannelElement id="articleToolbar" name="Article Text">
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            ref={quillRef}
            modules={modules}
            formats={formats}
          />
          <SmalSubmitButton align="flex-end" text="Save" />
        </CreateChannelElement>
      </MainContainer>
    </MainSection>
  );
};

export default CreateArticlePage;
