import { useNavigate } from "react-router";
import { putCurrentJwtToken } from "../script/LocalStorageUtils";
import { useState, useEffect} from "react";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";

const WelcomePage = () => {
    const navigate = useNavigate(); // Call useNavigate at the top level

    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(() => {
        const token = getCurrentJwtToken();
        setIsAuthenticated(!!token);
    }, [])

    if(isAuthenticated === null) {
        return null;
    }

    if(isAuthenticated) {
        navigate("/")
    }

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