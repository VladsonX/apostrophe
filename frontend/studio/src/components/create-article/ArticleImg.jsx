import "./ArticleImg.scss";
import { useState } from "react";
import { serverURL } from "../../script/server";
import { useEffect } from "react";

const ArticleImg = ({ customImg, postImg }) => {
  const [image, setImage] = useState(postImg ? `${serverURL}/api/v1/media/${postImg}` : null);
  useEffect(() => {
    if (postImg) {
      setImage(`${serverURL}/api/v1/media/${postImg}`);
    }
  }, [postImg]);

  const handleAddImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";

    document.body.appendChild(input); // Добавляем input в DOM
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`${serverURL}/api/v1/media`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const uuid = await response.text();
        const imageUrl = `${serverURL}/api/v1/media/${uuid}`;
        setImage(imageUrl);
        customImg(uuid);
      } catch (error) {
        console.error(error);
      } finally {
        document.body.removeChild(input); // Удаляем input из DOM
      }
    };
  };

  return (
    <>
      {image ? (
        <img
          className="article-img"
          src={image}
          alt="Uploaded"
          onClick={handleAddImage}
        />
      ) : (
        <button className="article-img" onClick={handleAddImage}>
          <p className="article-img__text">Add +</p>
        </button>
      )}
    </>
  );
};

export default ArticleImg;
