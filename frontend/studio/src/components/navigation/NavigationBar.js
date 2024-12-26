import { Link } from "react-router";
import "./NavigationBar.css"
import PageButton from "./PageButton";
import LogOutButton from "./LogOutButton";

function NavigationBar() {
    return (
        <nav className="navigation-bar">
            <Link to="/" className="logo-container">
                <span className="logo">Apostrophe</span>
                <span className="logo-subtitle">studio</span>
            </Link>
            <div className="splitter" />
            <div className="page-button-list">
                <PageButton title="My channels" path="/" />
                <PageButton title="Settings" path="/settings" />
            </div>
            <LogOutButton />
        </nav>
    )
}

export default NavigationBar;