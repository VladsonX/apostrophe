import { Link } from "react-router";
import "./NavigationBar.scss";
import PageButton from "./PageButton";
import LogOutButton from "./LogOutButton";
import { FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

function NavigationBar() {
  const isMobile = useMediaQuery({ maxWidth: 992 });
  return (
    <nav className="navigation-bar nav">
      <Link to="/" className="logo-container">
        <span className="nav__logo">Apostrophe</span>
        <span className="logo-subtitle">[Studio]</span>
      </Link>
      <div className="splitter" />
      <div className="page-button-list">
        <div className="channels">
          <PageButton
            mobile={isMobile ? true : false}
            id="home"
            icon={<FaHome />}
            title="Main"
            path="/"
          />

          {isMobile ? (
            <LogOutButton mobile={true} id="log-out" icon={<MdLogout />} title="Log Out" />
          ) : (
            <></>
          )}
        </div>
        {!isMobile ? (
          <div className="utilities">
            <LogOutButton id="log-out" icon={<MdLogout />} title="Log Out" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
