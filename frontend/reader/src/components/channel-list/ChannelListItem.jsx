import "./ChannelListItem.scss";
import { NavLink } from "react-router";
import { serverURL } from "../../server";

const ChannelListItem = ({ subscription, aosEffect }) => {
  return (
    <li data-aos={aosEffect} className="channel-list-item">
      <NavLink aria-label={subscription.channel.name}
        className={({ isActive }) =>
          isActive
            ? "channel-list-item__link active"
            : "channel-list-item__link"
        }
        to={
          `/channel/${subscription.channel.channelId}` +
          (subscription.topic ? `/topic/${subscription.topic.topicId}` : "")
        }
      >
        {subscription.channel.avatar ? (
          <img
            className="channel-list-item__logo"
            src={serverURL + "/api/v1/media/" + subscription.channel.avatar}
            alt={subscription.channel.name}
          />
        ) : (
          <div
            className="channel-list-item__logo channel-list-item__logo-placeholder"
            style={{
              backgroundColor: subscription.channel.logoPlaceholderColor,
            }}
          >
            <span>{subscription.channel.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div className="channel-list-item__name-wrapper">
          {subscription.topic ? (
<> <span className="channel-list-item__name-channel">
          {subscription.channel.name}
        </span>

          <span className="channel-list-item__name-topic">
            {subscription.topic.name}
          </span></>
          ) : <span className="channel-list-item__name-channel channel-list-item__name-channel-no-topic">
          {subscription.channel.name}
        </span>}
       

        </div>

      </NavLink>
    </li>
  );
};

export default ChannelListItem;
