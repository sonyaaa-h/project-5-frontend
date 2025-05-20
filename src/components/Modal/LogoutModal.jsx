import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import css from "./LogoutModal.module.css";
import LogoIconModal from "../tempIcons/LogoIconModal";

export default function LogoutModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      toast.success("Successfully logged out");
    }  catch (error) {
      toast.error(`Logout failed: ${error.message || error}`);
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
          <LogoIconModal className={css.logoIcon} />
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
