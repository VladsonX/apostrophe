/* eslint-disable react-refresh/only-export-components -- context, hooks and helpers live together */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { mediaApi } from "../../api";
import { mediaUrl } from "../../api/client";
import pickFile from "../../script/pickFile";
import { useArticleField } from "./ArticleFormContext";
import "./ArticleText.scss";
import "../../pages/CustomQuillTheme.scss";

// Quill calls toolbar handlers with `this` bound to the toolbar module,
// so `this.quill` is the editor. Defining them at module level keeps `modules`
// stable between renders (a new object would re-create the editor).
async function insertImage() {
  const file = await pickFile();
  if (!file) return;
  const key = await mediaApi.upload(file);
  const range = this.quill.getSelection(true);
  this.quill.insertEmbed(range.index, "image", mediaUrl(key));
}

function insertQuote() {
  const range = this.quill.getSelection(true);
  const quote = "<blockquote> </blockquote><p class='ql-align-right'>Author</p>";
  this.quill.clipboard.dangerouslyPasteHTML(range.index, quote);
  this.quill.setSelection(range.index + 1);
}

const MODULES = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, "bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
    handlers: { image: insertImage, blockquote: insertQuote },
  },
};

export const FORMATS = [
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

const ArticleEditor = () => {
  const [content, setContent] = useArticleField("content");
  return <ReactQuill value={content} onChange={setContent} modules={MODULES} formats={FORMATS} />;
};

export default ArticleEditor;
