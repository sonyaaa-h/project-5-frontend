import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import css from "./LogoutModal.module.css";
import { ReactComponent as LogoIcon } from "../../assets/icons/money_guard_modal.svg?react";

export default function LogoutModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Successfully logged out");
    } catch {
      toast.error("Logout failed. Please try again.");
    } finally {
      localStorage.clear();
      navigate("/login", { replace: true });
      onClose();
    }
  };

  return (
    <div className={css.Backdrop}>
      <div className={css.modal}>
        <div className={css.logo}>
          <LogoIcon className={css.logoIcon} />
          <span className={css.textLogo}>Money Guard</span>
        </div>
        <p className={css.text}>Are you sure you want to log out?</p>
        <div className={css.buttons}>
          <button onClick={handleLogout} className={css.logoutBtn}>
            Logout
          </button>
          <button onClick={onClose} className={css.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
