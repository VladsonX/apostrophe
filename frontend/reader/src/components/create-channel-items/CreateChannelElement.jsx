import "./CreateChannelElement.scss";
import React from "react";
import CreateChannelTitle from "./CreateChannelTitle";


const CreateChannelElement = ({ children, name, id, number, aosEffect }) => {
  const enhancedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, { 'data-aos': aosEffect });
  });
  return (
    <div data-aos={aosEffect} id={id} className="create-channel-element">
      <CreateChannelTitle number={number} name={name} />

      {enhancedChildren}
    </div>
  );
};

export default CreateChannelElement;
