import "./PageButton.css"
import { NavLink } from "react-router";

const PageButton = ({ title, path }) => {
    return (
        <NavLink className="page-button" key={title} to={path}>
            {title}
        </NavLink>
    )
}
export default PageButton;