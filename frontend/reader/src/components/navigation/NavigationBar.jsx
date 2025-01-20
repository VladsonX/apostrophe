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

function NavigationBar() {
  return (
    <nav className="navigation-bar nav">
      <Link to="/" className="logo-container">
        <span className="nav__logo">Apostrophe</span>
      </Link>
      <div className="splitter" />
      <div className="page-button-list">
        <div className="channels">
          <PageButton icon={<FaHome />} title="Home" path="/" />
          <PageButton
            icon={<BsMailboxFlag />}
            title="Subscriptions"
            path="subscriptions"
          />
          <PageButton
            icon={<LiaMapSignsSolid />}
            title="Explore"
            path="explore"
          />
          <PageButton icon={<IoSearch />} title="Search" path="search" />
        </div>
        <div className="utilities">
          <PageButton
            icon={<IoSettingsOutline />}
            title="Settings"
            path="/settings"
          />
        </div>
      </div>
      <LogOutButton icon={<MdLogout />} title="Log Out" />
    </nav>
  );
}

export default NavigationBar;
