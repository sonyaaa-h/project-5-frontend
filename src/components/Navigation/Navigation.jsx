import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { SlGraph } from "react-icons/sl";
import homeIcon from "../../assets/icons.svg";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div className={css.block}>
      <NavLink className={buildLinkClass} to="/">
        <svg>{homeIcon}</svg>
        <span>Home</span>
      </NavLink>
      <NavLink className={buildLinkClass} to="/statistics">
        <span>Statistics</span>
      </NavLink>
      <NavLink className={buildLinkClass} to="/currency">
        Currency
      </NavLink>
    </div>
  );
};
export default Navigation;
