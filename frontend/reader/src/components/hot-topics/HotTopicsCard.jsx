import "./HotTopicsCard.scss";
import { CiTimer } from "react-icons/ci";
import { IconContext } from "react-icons";
import { NavLink } from "react-router";
import convertEstimatedReadingTime from "../../script/EstimatedReadingTImeConverter";
import reformateDate from "../../script/reformateDate";
import { serverURL } from "../../server";
import { CiImageOn } from "react-icons/ci";
import { useMediaQuery } from "react-responsive";

const HotTopicsCard = ({ post }) => {
  const isMobile = useMediaQuery({ maxWidth: 992 });

  const logoUrl = `${serverURL}/api/v1/media/${post.channel.avatar}`;
  const imageUrl = `${serverURL}/api/v1/media/${post.thumbnail}`;
  return (
    <div className="hot-topics-card">
      <div className="hot-topics-card__header">
        <div className="hot-topics-card__channel-wrapper">
          <NavLink
            aria-label={post.title}
            className="channel-latest-articles__logo-link"
            to={
              `/channel/${post.channel.channelId}` +
              (post.topic ? `/topic/${post.topic.topicId}` : "")
            }
          >
            {post.channel.avatar ? (
              <img
                className="hot-topics-card__channel-logo"
                src={logoUrl}
                alt={post.channel.name}
              />
            ) : (
              <div
                className="hot-topics-card__channel-logo-placeholder"
                style={{ backgroundColor: post.channel.logoPlaceholderColor }}
              >
                <span>{post.channel.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </NavLink>

          <div className="hot-topics-card__full-channel-name-wrapper">
            {post.topic ? (
              <>
                <h4 className="hot-topics-card__channel-name">
                  {post.channel.name}
                </h4>
                <h3 className="hot-topics-card__topic-name hot-topics-card__topic-name-no-topic">
                  {post.topic.name}
                </h3>
              </>
            ) : (
              <h3 className="hot-topics-card__channel-name">
                {post.channel.name}
              </h3>
            )}
          </div>
        </div>
        <div className="hot-topics-card__time-to-read-wrapper">
          <IconContext.Provider
            value={{
              size: isMobile ? ".75rem" : "1rem",
              className: "hot-topics-card__icon",
            }}
          >
            <CiTimer />
          </IconContext.Provider>
          <span className="hot-topics-card__time-to-read-text">
            {convertEstimatedReadingTime(post.estimatedReadingTime)}
          </span>
        </div>
        <div className="hot-topics-card__published">
          Published {reformateDate(post.lastModifiedAt)}
        </div>
      </div>
      {isMobile ? (
        <div className="hot-topics-card__content-wrapper hot-topics-card__content-wrapper_mobile">
          <div className="hot-topics-card__image-title-wrapper">
            <h2 className="hot-topics-card__title">{post.title}</h2>
            <div className="hot-topics-card__content-container">
              <div className="hot-topics-card__snippet">
                <div className="hot-topics-card__img-wrapper">
                  {post.thumbnail ? (
                    <img
                      className="hot-topics-card__img"
                      src={imageUrl}
                      alt={post.thumbnailAltText}
                    />
                  ) : (
                    <div className="hot-topics-card__img-placeholder">
                      <IconContext.Provider
                        value={{
                          size: "12rem",
                          className: "hot-topics-card__img-placeholder-icon",
                        }}
                      >
                        <CiImageOn />
                      </IconContext.Provider>
                    </div>
                  )}

                  <span className="hot-topics-card__img-descr">
                    {post.thumbnailAltText}
                  </span>
                </div>
                {post.postSnippet}
              </div>
            </div>
            <NavLink
          aria-label={post.title}
              className="hot-topics-card__button-link"
              to={
                `channel/${post.channel.channelId}/` +
                (post.topic
                  ? `topic/${post.topic.topicId}/article/${post.postId}`
                  : `article/${post.postId}`)
              }
            >
              <button
                aria-label="Read More"
                className="hot-topics-card__button"
              >
                Read more
              </button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="hot-topics-card__content-wrapper">
          <div className="hot-topics-card__img-wrapper">
            {post.thumbnail ? (
              <img
                className="hot-topics-card__img"
                src={imageUrl}
                alt={post.thumbnailAltText}
              />
            ) : (
              <div className="hot-topics-card__img-placeholder">
                <IconContext.Provider
                  value={{
                    size: "12rem",
                    className: "hot-topics-card__img-placeholder-icon",
                  }}
                >
                  <CiImageOn />
                </IconContext.Provider>
              </div>
            )}

            <span className="hot-topics-card__img-descr">
              {post.thumbnailAltText}
            </span>
          </div>
          <div className="hot-topics-card__text-wrapper">
            <h2 className="hot-topics-card__title">{post.title}</h2>
            <div className="hot-topics-card__snippet">{post.postSnippet}</div>
            <NavLink
            aria-label={post.title}
              className="hot-topics-card__button-link"
              to={
                `channel/${post.channel.channelId}/` +
                (post.topic
                  ? `topic/${post.topic.topicId}/article/${post.postId}`
                  : `article/${post.postId}`)
              }
            >
              <button
                aria-label="Read More"
                className="hot-topics-card__button"
              >
                Read more
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotTopicsCard;
