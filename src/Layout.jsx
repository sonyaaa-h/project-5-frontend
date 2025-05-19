import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <AppBar />
      <Sidebar/>
      <Outlet />
    </div>
  );
};
export default Layout;
