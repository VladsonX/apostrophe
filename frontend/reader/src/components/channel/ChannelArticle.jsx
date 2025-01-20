import { CiTimer } from "react-icons/ci";
import { IconContext } from "react-icons";
import "./ChannelArticle.scss";
import ReadMoreButton from "./ReadMoreButton";

const ChannelArticle = ({ channel }) => {
  return (
    <div className="channel-latest-articles__article">
      <div className="channel-latest-articles__article-header">
        <div className="channel-latest-articles__logo-title-wrapper">
          {channel.avatar ? (
            <img src={channel.avatar} alt={channel.name} />
          ) : (
            <div
              className="channel-list-item__logo channel-list-item__logo-placeholder channel-list-item__logo-placeholder_article"
              style={{ backgroundColor: channel.logoPlaceholderColor }}
            >
              <span>{channel?.name?.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div className="channel-latest-articles__title-wrapper">
            <h4 className="channel-latest-articles__title">
              {/* {channel.name} */}
              The British Broadcasting Corporation (BBC)
            </h4>

            <h5 className="channel-latest-articles__title-topic">Science</h5>
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
              25 minute read
            </p>
          </div>
          <div className="channel-latest-articles__published-wrapper">
            <p className="channel-latest-articles__published">
              Published 7:51 AM EST, Thu December 19, 2024
            </p>
          </div>
        </div>
      </div>
      <div className="channel-latest-articles__article-content-wrapper">
        <h3 className="channel-latest-articles__article-name">
          A festive sweet treat with surprising Swedish origins
        </h3>
        <div className="channel-latest-articles__article-content">
          <div className="channel-latest-articles__article-content-img-wrapper">
            <img
              className="channel-latest-articles__article-content-img"
              src="https://i.scdn.co/image/ab67616d00001e02253bcf731719eb4863f3ec60"
              alt="aboba"
            />
            <span className="channel-latest-articles__article-content-img-descr">
              Alamy Shopfronts in Gränna, Sweden (Credit: Alamy)
            </span>
          </div>
          <div className="channel-latest-articles__article-content-text-wrapper">
            <div className="channel-latest-articles__article-content-text">
              A recent visit to the company’s overhauled drone delivery program
              in Arizona left me impressed by the drones, but skeptical that the
              public will welcome them.
            </div>
            <ReadMoreButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelArticle;
