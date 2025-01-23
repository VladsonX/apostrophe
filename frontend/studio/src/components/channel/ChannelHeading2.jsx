import "./ChannelHeading2.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const ChannelHeading2 = ({ name }) => {
        useEffect(() => {
          AOS.init({
            duration: 800,  
            easing: 'ease-out',  
            once: true, 
          });
        }, []);
  return (
    <h2 data-aos='zoom-fade-in' className="channel-heading2">
      {name}
    </h2>
  );
};

export default ChannelHeading2;
