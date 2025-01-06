import './CreateChannelElement.scss';
import CreateChannelTitle from './CreateChannelTitle';

const CreateChannelElement = ( {children, name} ) => {
  return (
    <div className="create-channel-element">
      <CreateChannelTitle name={name} />

      {children}
      </div>
  )
}

export default CreateChannelElement