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

  if (!isAuthenticated) {
    navigate('/welcome');
  }
  return (
    
    <main className="root-layout">
      <div className="root-layout__nav-wrapper">
        <NavigationBar />
      </div>

      <Outlet />
    </main>
  );
};

export default RootLayout;
