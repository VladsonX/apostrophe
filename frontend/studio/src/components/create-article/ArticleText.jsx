import "./ArticleText.scss";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArticleText = (value, onChange, ref, modules, formats) => {
//   const [editorContent, setEditorContent] = useState("");

  return (
    //   <div className="article-text-editor"></div>;
    <ReactQuill
      value={value}
      onChange={onChange}
      ref={ref}
      modules={modules}
      formats={formats}
    />
  );
};

export default ArticleText;
