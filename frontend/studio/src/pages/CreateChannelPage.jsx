import './CreateChannelPage.scss';
import TopNavigationBar from '../components/top-navigation/TopNavigationBar';
import { FaHome } from 'react-icons/fa';

const CreateChannelPage = () => {
  return (
    <TopNavigationBar icon={<FaHome />} name="My Channels" />

  )
}

export default CreateChannelPage