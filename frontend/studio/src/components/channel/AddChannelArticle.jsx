import { NavLink } from 'react-router';
import './AddChannelArticle.scss';

const AddChannelArticle = () => {
  return (
    <NavLink to={`createarticle`} className='add-channel-article__border'>
        <p className='add-channel-article__text'>Add new article +</p>
    </NavLink>
  )
}

export default AddChannelArticle