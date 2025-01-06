import "./CreateChannelPage.scss";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { FaHome } from "react-icons/fa";
import MainContainer from "../components/MainContainer";
import MainSection from "../components/MainSection";

const CreateChannelPage = () => {
  return (
    <MainSection>
      <TopNavigationBar icon={<FaHome />} name="My Channels" />
      <MainContainer />
    </MainSection>
  );
};

export default CreateChannelPage;
