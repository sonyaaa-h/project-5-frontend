import css from "../Modal/LogoutModal.module.css";
import s from "./ModalDeleteTransaction.module.css";
import LogoIconModal from "../tempIcons/LogoIconModal";
import CloseIcon from "../../assets/icon-close.svg";
import toast from "react-hot-toast";
import { deleteTransaction } from "../../redux/transactions/operations.js";
import { useDispatch } from "react-redux";

const ModalDeleteTransaction = ({ _id, onClose, message }) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const dispatch = useDispatch();
  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteTransaction(_id)).unwrap();
      toast.success(`Transaction  is deleted successfully!`);
    } catch (error) {
      toast.error(
        `Failed to delete transaction: ${error.message || "Unknown error"}`
      );
    } finally {
      onClose();
    }
  };

  return (
    <div className={css.Backdrop} onClick={handleBackdropClick}>
      <div
        className={`${css.modal} ${s.deleteModal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={CloseIcon} alt="Close" className={s.icon} onClick={onClose} />
        <div className={css.logo}>
          <LogoIconModal className={css.logoIcon} />
          <span className={css.textLogo}>Spendy</span>
        </div>
        <p className={css.text}>{message}</p>
        <div className={css.buttons}>
          <button
            onClick={handleDeleteConfirm}
            className={`${css.logoutBtn} ${s.deletetBtn}`}
          >
            Delete
          </button>
          <button onClick={onClose} className={css.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteTransaction;
