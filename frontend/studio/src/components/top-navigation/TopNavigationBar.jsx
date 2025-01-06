import "./TopNavigationBar.scss";
import { IconContext } from "react-icons";

const TopNavigationBar = ({ button, name, icon }) => {
  return (
    <section className="top-nav">
      <div className="top-nav-path">
        <IconContext.Provider value={{ color: "white" }}>
          <div className="top-nav-icon">{icon}</div>
        </IconContext.Provider>
        <span className="top-nav-title">{name}</span>
        {(button) &&  button}
      </div>
      <hr className="top-nav-divider" />
    </section>
  );
};

export default TopNavigationBar;
