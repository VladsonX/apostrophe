import { Link } from "react-router";
import "./NavigationBar.scss";
import PageButton from "./PageButton";
import LogOutButton from "./LogOutButton";
import { FaHome } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

function NavigationBar() {
  return (
    <nav className="navigation-bar nav">
      <Link to="/" className="logo-container">
        <span className="nav__logo">Apostrophe</span>
        <span className="logo-subtitle">[studio]</span>
      </Link>
      <div className="splitter" />
      <div className="page-button-list">
        <div className="channels">
          <PageButton icon={<FaHome />} title="My channels" path="/" />
        </div>
        <div className="utilities">
          <PageButton
            icon={<IoSettingsOutline />}
            title="Settings"
            path="/settings"
          />
        </div>
      </div>
      <LogOutButton icon={<MdLogout />}
      title='Log Out' />
    </nav>
  );
}

export default NavigationBar;
