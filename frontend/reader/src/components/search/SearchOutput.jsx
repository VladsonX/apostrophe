import "./SearchOutput.scss";
import ChannelRecommended from "../create-channel-items/ChannelRecommended";

const SearchOutput = () => {
  const channelExample = {
    name: "The British Broadcasting Corporation (BBC)",
    description:
      "The British Broadcasting Corporation (BBC) is a British public service broadcaster headquartered at Broadcasting House in London, England. Originally established in 1922 as the British Broadcasting Company, it evolved into its current state with its current name on New Year's Day 1927. The oldest and largest local and global broadcaster by stature and by number of employees, the BBC employs over 21,000 staff in total, of whom approximately 17,200 are in public-sector broadcasting.",
    avatar: 'https://seekvectors.com/files/download/BBC-Logo-07.png',
  };
  return (
    <div className="search__output-wrapper">
      <ChannelRecommended channel={channelExample} />
      <ChannelRecommended channel={channelExample} />
      <ChannelRecommended channel={channelExample} />
      <ChannelRecommended channel={channelExample} />
      <ChannelRecommended channel={channelExample} />
    </div>
  );
};

export default SearchOutput;
