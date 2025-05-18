import Currency from "../Currency/Currency.jsx";
import css from "./Sidebar.module.css";
import Navigation from "../Navigation/Navigation.jsx";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <p>Sidebar</p>
      <div className="sidebarComponent">
        <Navigation />
      </div>

      <div className="sidebarComponent">
        {/* <Ballance /> */}
        <Currency />
      </div>
    </div>
  );
};
export default Sidebar;
