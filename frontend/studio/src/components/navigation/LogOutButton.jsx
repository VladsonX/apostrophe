import { useNavigate } from "react-router";
import { resetCurrentJwtToken } from "../../script/LocalStorageUtils";
import "./PageButton.scss";
import { IconContext } from "react-icons";

const LogOutButton = ({ icon, title }) => {
  const navigate = useNavigate();

  const logOutHook = () => {
    resetCurrentJwtToken();
    navigate("/welcome");
  };

  return (
    <button className="page-button log-out-button" onClick={logOutHook}>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="page-button-icon">{icon}</div>
      </IconContext.Provider>
      <span className="page-button-title log-out-button__title">{title}</span>
    </button>
  );
};

export default LogOutButton;
