import { useState } from "react";
import { mediaApi } from "../../api";
import { mediaUrl } from "../../api/client";
import pickFile from "../../script/pickFile";
import ErrorMessage from "../main-components/ErrorMessage";
import { useArticleField } from "./ArticleFormContext";
import "./ArticleImg.scss";

const ArticleImg = () => {
  const [thumbnail, setThumbnail] = useArticleField("thumbnail");
  const [error, setError] = useState(null);

  const handleAddImage = async () => {
    const file = await pickFile();
    if (!file) return;
    try {
      setError(null);
      setThumbnail(await mediaApi.upload(file));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      {thumbnail ? (
        <img
          className="article-img"
          src={mediaUrl(thumbnail)}
          alt="Article thumbnail"
          onClick={handleAddImage}
        />
      ) : (
        <button type="button" className="article-img" onClick={handleAddImage}>
          <p className="article-img__text">Add +</p>
        </button>
      )}
      <ErrorMessage error={error} />
    </>
  );
};

export default ArticleImg;
