import { Link } from "react-router";
import "./NavigationBar.scss";
import PageButton from "./PageButton";
import LogOutButton from "./LogOutButton";
import { FaHome } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { LiaMapSignsSolid } from "react-icons/lia";
import { BsMailboxFlag } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

function NavigationBar() {
  const isMobile = useMediaQuery({ maxWidth: 992});
  return (
    <nav className="navigation-bar nav">
      <Link to="/" className="logo-container">
        <span className="nav__logo">Apostrophe</span>
      </Link>
      <div className="splitter" />
      <div className="page-button-list">
        <div className="channels">
          <PageButton
            mobile={isMobile ? true : false}
            id="home"
            icon={<FaHome />}
            title="Home"
            path="/"
          />
          <PageButton
            mobile={isMobile ? true : false}
            id="subscription"
            icon={<BsMailboxFlag />}
            title="Subscriptions"
            path="subscriptions"
          />
          <PageButton
            mobile={isMobile ? true : false}
            id="explore"
            icon={<LiaMapSignsSolid />}
            title="Explore"
            path="explore"
          />
          <PageButton
            mobile={isMobile ? true : false}
            id="search"
            icon={<IoSearch />}
            title="Search"
            path="search"
          />
          {isMobile ? (
            <LogOutButton
              mobile={true}
              id="log-out"
              icon={<MdLogout />}
              title="Log Out"
            />
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
