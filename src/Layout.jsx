import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Sidebar from "./components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <AppBar />
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Layout;
