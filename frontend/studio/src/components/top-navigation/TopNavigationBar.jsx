import { NavLink, useParams } from "react-router";
import "./TopNavigationBar.scss";
import { IconContext } from "react-icons";

const TopNavigationBar = ({ button, channel, topic, post, icon, name, aosEffect }) => {
  // const { channelId, topicId, postId } = useParams();
  // console.log(channelId, topicId, postId);
  return (
    <section data-aos={aosEffect} className="top-nav">
      <div className="top-nav-path">
        <IconContext.Provider value={{ color: "white" }}>
          <div className="top-nav-icon">{icon}</div>
        </IconContext.Provider>
        <span className="top-nav-title">
          {name ? name : ""}
          {channel && (
            <NavLink
              to={`/channel/${channel.channelId}`}
              className="top-nav-link"
            >
              {channel.name}
            </NavLink>
          )}
          {topic && (
            <NavLink
              to={`/channel/${channel.channelId}/topic/${topic.topicId}`}
              className="top-nav-link"
            >
              <span className="top-nav-slash"> / </span>
              {topic.name}
            </NavLink>
          )}
          {post && topic ? (
            <NavLink
              to={`/channel/${channel.chanelId}/topic/${topic.topicId}/readarticle/${post.postId}`}
              className="top-nav-link"
            >
              <span className="top-nav-slash"> / </span>
              {post.title}
            </NavLink>
          ) : post && (
            <NavLink
              to={`/channel/${channel.chanelId}/readarticle/${post.postId}`}
              className="top-nav-link"
            >
              <span className="top-nav-slash"> / </span>
              {post.title}
            </NavLink>
          )}
        </span>

        {button && button}
      </div>
      <hr className="top-nav-divider" />
    </section>
  );
};

export default TopNavigationBar;
