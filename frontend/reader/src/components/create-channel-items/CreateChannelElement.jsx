import './CreateChannelElement.scss';
import CreateChannelTitle from './CreateChannelTitle';

const CreateChannelElement = ( {children, name, id, number} ) => {
  return (
    <div id={id} className="create-channel-element">
      <CreateChannelTitle number={number} name={name} />

      {children}
      </div>
  )
}

export default CreateChannelElement