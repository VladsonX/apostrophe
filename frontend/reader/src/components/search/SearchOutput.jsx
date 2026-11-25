import "./SearchOutput.scss";
import ChannelRecommended from "../create-channel-items/ChannelRecommended";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const SearchOutput = ({ channels, foundStatus, search }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);
  return (
    <>
      {foundStatus === false && search ? (
        <div className="search__output-placeholder">
          Unfortunately, channel wasn't found :(
        </div>
      ) : channels ? (
        <div className="search__output-wrapper">
          {channels.map((channel) => (
            <ChannelRecommended
              aosEffect="fade-up"
              channel={channel}
              key={channel.channelId}
            />
          ))}
        </div>
      ) : (
        <div className="search__output-placeholder">
          Please enter the name of a channel you want to find
        </div>
      )}
    </>
  );
};

export default SearchOutput;
