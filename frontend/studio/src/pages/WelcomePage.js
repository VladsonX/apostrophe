import { useNavigate } from "react-router";
import { putCurrentJwtToken } from "../script/LocalStorageUtils";

const WelcomePage = () => {
    const navigate = useNavigate(); // Call useNavigate at the top level

    const handleLogin = () => {
        putCurrentJwtToken("abc123");
        navigate("/"); // Use navigate here
    };

    return (
        <div>
            <p>I'm welcome page</p>
            <button onClick={handleLogin}>Log in</button>
        </div>
    );
};

export default WelcomePage;