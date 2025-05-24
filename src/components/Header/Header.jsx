import css from "./Header.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import LogoutModal from "../Modal/LogoutModal";
import LogoIcon from "../tempIcons/LogoIcon";
import ExitIcon from "../tempIcons/ExitIcon";
import { UserModal } from "../UserModal/UserModal";

export default function Header() {
  const username = useSelector((state) => state.auth.user?.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleLogoutClick = () => setIsModalOpen(true);
  const handleUpdateUserClick = () => setIsUserModalOpen(true);

  const firstLetter = username ? username.charAt(0) : "";

  return (
    <header className={css.header}>
      <div className={css.container}>
        <div className={css.logo}>
          <LogoIcon className={css.logoIcon} />
          <span className={css.textLogo}>Spendy</span>
        </div>
        <div className={css.userSection}>
          <button onClick={handleUpdateUserClick} className={css.updateBtn}>
            <span className={css.username}>{firstLetter}</span>
          </button>
          <div className={css.exitContainer}>
            <button onClick={handleLogoutClick} className={css.exitBtn}>
              <ExitIcon className={css.exitIcon} />
              <span className={css.exitText}>Exit</span>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && <LogoutModal onClose={() => setIsModalOpen(false)} />}
      {isUserModalOpen && (
        <UserModal onClick={() => setIsUserModalOpen(false)} />
      )}
    </header>
  );
}
