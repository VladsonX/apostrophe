import { useNavigate } from "react-router";
import { resetCurrentJwtToken } from "../../script/LocalStorageUtils";

const LogOutButton = () => {

    const navigate = useNavigate();

    const logOutHook = () => {
        resetCurrentJwtToken();
        navigate("/welcome");
    }

    return (<button onClick={logOutHook}>Log out</button>)
}

export default LogOutButton;