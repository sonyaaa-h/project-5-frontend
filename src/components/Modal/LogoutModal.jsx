import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import css from "./LogoutModal.module.css";
import LogoIconModal from "../tempIcons/LogoIconModal";
import { logoutThunk } from "../../redux/auth/logoutThunk";

export default function LogoutModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      toast.success("Successfully logged out");
    } catch (error) {
      toast.error(`Logout failed: ${error.message || error}`);
    } finally {
      onClose();
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className={css.Backdrop}>
      <div className={css.modal}>
        <div className={css.logo}>
          <LogoIconModal className={css.logoIcon} />
          <span className={css.textLogo}>Spendy</span>
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
