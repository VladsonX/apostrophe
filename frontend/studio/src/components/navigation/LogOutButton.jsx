import { useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import "./PageButton.scss";
import { IconContext } from "react-icons";

const LogOutButton = ({ icon, title, id, mobile }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const logOutHook = () => {
    logout();
    navigate("/welcome");
  };

  return (
    <button
      aria-label="Log out"
      id={id}
      className="page-button log-out-button"
      onClick={logOutHook}
    >
      <IconContext.Provider value={{ color: "white" }}>
        <div className="page-button-icon">{icon}</div>
      </IconContext.Provider>

      <span className="page-button-title log-out-button__title">{!mobile ? title : ""}</span>
    </button>
  );
};

export default LogOutButton;
