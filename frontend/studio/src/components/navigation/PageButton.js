import "./PageButton.scss";
import { NavLink } from "react-router";
import { IconContext } from "react-icons";

const PageButton = ({ title, path, icon }) => {
  return (
    <NavLink className="page-button" key={title} to={path}>
      <IconContext.Provider value={{ color: 'white'}}>
        <div className="page-button-icon">{icon}</div>
      </IconContext.Provider>
      <span className="page-button-title">{title}</span>
    </NavLink>
  );
};
export default PageButton;
