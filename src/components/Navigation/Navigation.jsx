import { NavLink, useLocation, useNavigate } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import HomeIcon from "../../assets/icon-home.svg?react";
import GraphIcon from "../../assets/icon-graph.svg?react";
import DollarIcon from "../../assets/icon-dollar.svg?react";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

const Navigation = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/currency" && isTabletOrDesktop) {
      navigate("/");
    }
  }, [isTabletOrDesktop, location.pathname, navigate]);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div className={css.block}>
      <NavLink className={buildLinkClass} to="/">
        <HomeIcon className={css.icon} />
        <span>Home</span>
      </NavLink>
      <NavLink className={buildLinkClass} to="/statistics">
        <GraphIcon className={css.icon} />
        <span>Statistics</span>
      </NavLink>
      {isMobile && (
        <NavLink className={buildLinkClass} to="/currency">
          <DollarIcon className={css.icon} />
        </NavLink>
      )}
    </div>
  );
};
export default Navigation;
