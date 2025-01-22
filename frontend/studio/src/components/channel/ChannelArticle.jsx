import { CiTimer } from "react-icons/ci";
import { IconContext } from "react-icons";
import "./ChannelArticle.scss";
import ReadMoreButton from "./ReadMoreButton";
import { serverURL } from "../../server";
import { CiImageOn } from "react-icons/ci";

const ChannelArticle = ({ channel, post }) => {
  const imageURL = post.thumbnail
    ? `${serverURL}/api/v1/media/${post.thumbnail}`
    : "";
  const logoURL = channel.avatar
    ? `${serverURL}/api/v1/media/${channel.avatar}`
    : "";
  return (
    <div className="channel-latest-articles__article">
      <div className="channel-latest-articles__article-header">
        <div className="channel-latest-articles__logo-title-wrapper">
          {channel.avatar ? (
            <img
              class="channel-latest-articles__logo"
              src={logoURL}
              alt={channel.name}
            />
          ) : (
            <div
              className="channel-list-item__logo channel-list-item__logo-placeholder channel-list-item__logo-placeholder_article"
              style={{ backgroundColor: channel.logoPlaceholderColor }}
            >
              <span>{channel?.name?.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div className="channel-latest-articles__title-wrapper">
            <h4 className="channel-latest-articles__title">{channel.name}</h4>
            {post.topic ? (
              <h5 className="channel-latest-articles__title-topic">
                {post.topic.name}
              </h5>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="channel-latest-articles__header-info-wrapper">
          <div className="channel-latest-articles__time-to-read-wrapper">
            <IconContext.Provider
              value={{
                size: ".75rem",
                className: "create-channel-logo__add-icon",
              }}
            >
              <CiTimer />
            </IconContext.Provider>
            <p className="channel-latest-articles__time-to-read">
              {post.estimatedReadingTime} minutes read
            </p>
          </div>
          <div className="channel-latest-articles__published-wrapper">
            <p className="channel-latest-articles__published">
              Published {post.createdAt}
            </p>
          </div>
        </div>
      </div>
      <div className="channel-latest-articles__article-content-wrapper">
        <h3 className="channel-latest-articles__article-name">{post.title}</h3>
        <div className="channel-latest-articles__article-content">
          <div className="channel-latest-articles__article-content-img-wrapper">
            {post.thumbnail ? (
              <img
                className="channel-latest-articles__article-content-img"
                src={imageURL}
                alt={post.title}
              />
            ) : (
              <IconContext.Provider
                value={{
                  className:
                    "channel-latest-articles__article-content-placeholder",
                }}
              >
                <CiImageOn />
              </IconContext.Provider>
            )}

            <span className="channel-latest-articles__article-content-img-descr">
              {post.thumbnailAltText}
            </span>
          </div>
          <div className="channel-latest-articles__article-content-text-wrapper">
            <p className="channel-latest-articles__article-content-text">
              {post.postSnippet}
            </p>
            <ReadMoreButton post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelArticle;
