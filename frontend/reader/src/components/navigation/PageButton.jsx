import "./PageButton.scss";
import { NavLink } from "react-router";
import { IconContext } from "react-icons";

const PageButton = ({ title, path, icon, id, mobile }) => {
  return (
    <NavLink aria-label={title} id={id} className="page-button" key={title} to={path}>

        <IconContext.Provider
          value={{ color: "white", className: "page-button-icon" }}
        >
          <div>{icon}</div>
        </IconContext.Provider>


      <span className="page-button-title">{!mobile ? title : ""}</span>
    </NavLink>
  );
};
export default PageButton;
