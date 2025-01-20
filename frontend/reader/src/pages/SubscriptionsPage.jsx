import CreateChannelElement from "../components/create-channel-items/CreateChannelElement";
import MainContainer from "../components/main-components/MainContainer";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import "./SubscriptionsPage.scss";
import { BsMailboxFlag } from "react-icons/bs";
import ChannelsList from "../components/channel-list/ChannelsList";
import ChannelListItem from "../components/channel-list/ChannelListItem";
import ChannelRecommended from "../components/create-channel-items/ChannelRecommended";
import ChannelHeading2 from "../components/channel/ChannelHeading2";
import Footer from "../components/main-components/Footer";

const Subscriptions = () => {
  const channelTest = {
    name: "The British Broadcasting Corporation (BBC)",
    description:
      "The British Broadcasting Corporation (BBC) is a British public service broadcaster headquartered at Broadcasting House in London, England. Originally established in 1922 as the British Broadcasting Company, it evolved into its current state with its current name on New Year's Day 1927. The oldest and largest local and global broadcaster by stature and by number of employees, the BBC employs over 21,000 staff in total, of whom approximately 17,200 are in public-sector broadcasting.",
    avatar: "https://seekvectors.com/files/download/BBC-Logo-07.png",
    channelId: 123
  };
  return (
    <MainSection>
      <TopNavigationBar icon={<BsMailboxFlag />} name="Subscriptions" />
      <MainContainer>
        <div className="subscriptions__element">
            <ChannelHeading2 name='Subscriptions'/>
          <ChannelsList>
            <ChannelListItem channel={channelTest} />
          </ChannelsList>
        </div>
        <div className="subscriptions__element">
          <ChannelHeading2 name="Recommended" />
          <div className="subscriptions-recommended-wrapper">
            <ChannelRecommended channel={channelTest} />
            <ChannelRecommended channel={channelTest} />
            <ChannelRecommended channel={channelTest} />
            <ChannelRecommended channel={channelTest} />
            <ChannelRecommended channel={channelTest} />
            <ChannelRecommended channel={channelTest} />
          </div>
        </div>
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default Subscriptions;
