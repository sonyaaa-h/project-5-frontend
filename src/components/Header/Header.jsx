import css from "./Header.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import LogoutModal from "../Modal/LogoutModal";
import { ReactComponent as LogoIcon } from "../../assets/icons/money_guard.svg";
import { ReactComponent as ExitIcon } from "../../assets/icons/exit 1.svg";

export default function Header() {
  const username = useSelector((state) => state.auth.user.name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => setIsModalOpen(true);

  return (
    <header className={css.header}>
      <div className={css.logo}>
        <LogoIcon className={css.logoIcon} />
        <span className={css.textLogo}>Money Guard</span>
      </div>
      <div className={css.userSection}>
        <span className={css.username}>{username}</span>
        <button onClick={handleLogoutClick} className={css.exitBtn}>
          <ExitIcon className={css.exitIcon} />
          <span className={css.exitText}>Exit</span>
        </button>
      </div>

      {isModalOpen && <LogoutModal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
}
