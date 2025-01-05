import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import NavigationBar from "../components/navigation/NavigationBar";
import "./RootLayout.scss";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";

const RootLayout = () => {

  const [isAuthenticated, setIsAuthenticated] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCurrentJwtToken();
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    // TODO: return loading page instead
    return null;
  }

  if (!isAuthenticated) {
    navigate("/welcome");
  }

  return (
    <main className="root-layout">
      <NavigationBar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
