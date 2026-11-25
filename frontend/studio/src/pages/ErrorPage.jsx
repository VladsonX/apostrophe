import { NavLink } from "react-router";
import "./ErrorPage.scss";
import { MdErrorOutline } from "react-icons/md";

import { IconContext } from "react-icons";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-page__text-wrapper">
        <IconContext.Provider value={{ size: "5rem", className: "error-page__icon" }}>
          <MdErrorOutline />
        </IconContext.Provider>
        <p className="error-page__text error-page__text_large">404 Not Found</p>
        <p className="error-page__text">
          Sorry we couldn`t find requested page. From here you can return to{" "}
          <NavLink aria-label="Welcome Page" to="/welcome">
            Main Page
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
