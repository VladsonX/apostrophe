import CreateChannelTitle from "./CreateChannelTitle";
import "./CreateChannelElement.scss";

const CreateChannelElement = ({ children, name, id, number, aosEffect }) => (
  <div data-aos={aosEffect} id={id} className="create-channel-element">
    <CreateChannelTitle number={number} name={name} />
    {children}
  </div>
);

export default CreateChannelElement;
