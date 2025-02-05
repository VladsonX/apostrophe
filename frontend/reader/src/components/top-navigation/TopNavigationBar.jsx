import { NavLink } from "react-router";
import "./TopNavigationBar.scss";
import { IconContext } from "react-icons";
import { serverURL } from "../../script/server";

const TopNavigationBar = ({
  button,
  channel = {},
  topic,
  post,
  icon,
  name,
  aosEffect,
  noButton,
}) => {
  const logoUrl = channel.avatar
    ? `${serverURL}/api/v1/media/${channel.avatar}`
    : null;
  return (
    <section data-aos={aosEffect} className="top-nav">
      <div className="top-nav-path">
        {icon && (
          <IconContext.Provider value={{ color: "white" }}>
            <div className="top-nav-icon">{icon}</div>
          </IconContext.Provider>
        )}

        <span
          className={
            noButton ? "top-nav-title top-nav-title_no-button" : "top-nav-title"
          }
        >
          {name ? name : ""}
          {channel && (
            <NavLink
              aria-label={channel.name}
              to={`/channel/${channel.channelId}`}
              className="top-nav-link"
            >
              {channel.avatar ? (
                <img
                  src={logoUrl}
                  alt={channel.name}
                  className="top-nav-path__logo"
                />
              ) : (
                <></>
              )}

              {channel.name}
            </NavLink>
          )}
          {topic && (
            <NavLink
              aria-label={topic.name}
              to={`/channel/${channel.channelId}/topic/${topic.topicId}`}
              className="top-nav-link"
            >
              <span className="top-nav-slash"> / </span>
              {topic.name}
            </NavLink>
          )}
          {post && topic ? (
            <NavLink
              aria-label={post.title}
              to={`/channel/${channel.channelId}/topic/${topic.topicId}/article/${post.postId}`}
              className="top-nav-link"
            >
              <span className="top-nav-slash"> / </span>
              {post.title}
            </NavLink>
          ) : (
            post && (
              <NavLink
                aria-label={post.title}
                to={`/channel/${channel.channelId}/article/${post.postId}`}
                className="top-nav-link"
              >
                <span className="top-nav-slash"> / </span>
                {post.title}
              </NavLink>
            )
          )}
        </span>

        {button && button}
      </div>
      <hr className="top-nav-divider" />
    </section>
  );
};

export default TopNavigationBar;
