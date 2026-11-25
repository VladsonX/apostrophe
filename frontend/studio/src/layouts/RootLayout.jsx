import { Outlet } from "react-router";
import NavigationBar from "../components/navigation/NavigationBar";
import "./RootLayout.scss";

// Auth is handled by <RequireAuth> in App.jsx, so the layout only lays things out.
const RootLayout = () => (
  <main className="root-layout">
    <div className="root-layout__nav-wrapper">
      <NavigationBar />
    </div>
    <Outlet />
  </main>
);

export default RootLayout;
