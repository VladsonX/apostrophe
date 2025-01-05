import "./TopNavigationBar.scss";
import { IconContext } from "react-icons";

const TopNavigationBar = ({ name, icon }) => {
  return (
    <section className="top-nav">
      <div className="top-nav-path">
        <IconContext.Provider value={{ color: "white" }}>
          <div className="top-nav-icon">{icon}</div>
        </IconContext.Provider>
        <span className="top-nav-title">{name}</span>
      </div>
      <hr className="top-nav-divider" />
    </section>
  );
};

export default TopNavigationBar;
