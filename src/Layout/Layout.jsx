import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import s from "./Layout.module.css";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className={s.container}>
        <div className={s.wrapperHome}>
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Layout;
