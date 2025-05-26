import Currency from "../Currency/Currency.jsx";
import css from "./Sidebar.module.css";
import Navigation from "../Navigation/Navigation.jsx";
import Ballance from "../Ballance/Ballance.jsx";
import { useMediaQuery } from "react-responsive";

const Sidebar = () => {
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and ( max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  return (
    <div className={css.sidebar}>
      <div className={css.firstBlock}>
        <Navigation />
        {isTablet && <Ballance />}
      </div>

      <div className={css.secondBlock}>
        {isDesktop && <Ballance />}
        {(isTablet || isDesktop) && <Currency />}
      </div>
    </div>
  );
};
export default Sidebar;
