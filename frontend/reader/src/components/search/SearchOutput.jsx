import ChannelRecommended from "../create-channel-items/ChannelRecommended";
import "./SearchOutput.scss";

// channels === null means "nothing searched yet".
const SearchOutput = ({ channels }) => {
  if (channels === null) {
    return (
      <div className="search__output-placeholder">
        Please enter the name of a channel you want to find
      </div>
    );
  }

  if (!channels.length) {
    return (
      <div className="search__output-placeholder">Unfortunately, channel wasn&apos;t found :(</div>
    );
  }

  return (
    <div className="search__output-wrapper">
      {channels.map((channel) => (
        <ChannelRecommended aosEffect="fade-up" channel={channel} key={channel.channelId} />
      ))}
    </div>
  );
};

export default SearchOutput;
