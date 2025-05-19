import Currency from "../Currency/Currency.jsx";
import css from "./Sidebar.module.css";
import Navigation from "../Navigation/Navigation.jsx";
import Ballance from "../Ballance/Ballance.jsx";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

const Sidebar = () => {
  const isTablet = useMediaQuery({
    query: "(min-width: 767px) and ( max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 1280px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <div className={css.sidebar}>
      <div className={css.firstBlock}>
        <Navigation />
        {isTablet && <Ballance />}
      </div>

      <div className={css.secondBlock}>
        {!isTablet && <Ballance />}
        {!isMobile && <Currency />}
      </div>
    </div>
  );
};
export default Sidebar;
