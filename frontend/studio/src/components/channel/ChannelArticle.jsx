import { CiTimer } from "react-icons/ci";
import { IconContext } from "react-icons";
import "./ChannelArticle.scss";
import ReadMoreButton from "./ReadMoreButton";
import { mediaUrl } from "../../api/client";
import { CiImageOn } from "react-icons/ci";
import convertEstimatedReadingTime from "../../script/EstimatedReadingTImeConverter";
import reformateDate from "../../script/reformateDate";

const ChannelArticle = ({ channel, post }) => {
  const imageURL = post.thumbnail ? mediaUrl(post.thumbnail) : "";
  const logoURL = channel.avatar ? mediaUrl(channel.avatar) : "";
  return (
    <div data-aos="fade-up" className="channel-latest-articles__article">
      <div className="channel-latest-articles__article-header">
        <div className="channel-latest-articles__logo-title-wrapper">
          {channel.avatar ? (
            <img
              data-aos="fade-zoom-in"
              className="channel-latest-articles__logo"
              src={logoURL}
              alt={channel.name}
            />
          ) : (
            <div
              data-aos="fade-zoom-in"
              className="channel-list-item__logo channel-list-item__logo-placeholder channel-list-item__logo-placeholder_article"
              style={{ backgroundColor: channel.logoPlaceholderColor }}
            >
              <span data-aos="fade-zoom-in">{channel?.name?.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div className="channel-latest-articles__title-wrapper">
            <h4 className="channel-latest-articles__title">{channel.name}</h4>
            {post.topic ? (
              <h5 className="channel-latest-articles__title-topic">{post.topic.name}</h5>
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
              {convertEstimatedReadingTime(post.estimatedReadingTime)}
            </p>
          </div>
          <div className="channel-latest-articles__published-wrapper">
            <p className="channel-latest-articles__published">
              Published {reformateDate(post.createdAt)}
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
                  className: "channel-latest-articles__article-content-placeholder",
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
            <p className="channel-latest-articles__article-content-text">{post.postSnippet}</p>
            <ReadMoreButton post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelArticle;
