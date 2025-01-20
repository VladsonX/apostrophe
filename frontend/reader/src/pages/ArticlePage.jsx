import "./ArticlePage.scss";
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
import "./CustomQuillTheme.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "../components/main-components/Loader";
import ArticleHeader from "../components/article/ArticleHeader";
import Footer from "../components/main-components/Footer";

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
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule("toolbar");

      if (toolbar) {
        // toolbar.addHandler("image", imageHandler);
        toolbar.addHandler("blockquote", blockQuoteHandler);
      }
    }
  }, []);

  const handleSubmitButton = () => {
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
            onClick={handleSubmitButton}
            text="Edit"
            position="absolute"
          />
        }
        icon={<FaHome />}
        name={`${channel.name}/`}
      />
      <MainContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
          <ArticleHeader />
            <CreateChannelElement id="articleToolbar">
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
      <Footer />
    </MainSection>
  );
};

export default CreateArticlePage;
