import s from "./TransactionsItem.module.css";
import EditIcon from "../../assets/icon-edit.svg?react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteTransaction } from "../../redux/transactions/operations.js";
import logo from "../../assets/logo.svg";

const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // місяці з 0
  const year = String(dateObj.getFullYear()).slice(-2); // останні дві цифри
  return `${day}.${month}.${year}`;
};

const TransactionsItem = ({ id, date, type, category, comment, sum }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTransaction(id));
    toast.error(`Transaction "${comment}" is deleted!`);
    modalRef.current.close();
  };

  return (
    <li className={s.wrapperTransaction}>
      <ul className={s.transaction}>
        <li>{formatDate(date)}</li>
        <li>{type}</li>
        <li>{category}</li>
        <li>{comment}</li>
        <li>{sum}</li>
        <li>
          <EditIcon className={s.icon} />
          <button
            className={s.btnDelete}
            onClick={() => modalRef.current.showModal()}
          >
            Delete
          </button>
        </li>
      </ul>

      <dialog ref={modalRef} className={s.modalDel}>
        <div className={s.modalContent}>
          <img className={s.logo} src={logo} alt="logo" />
          <p>
            Are you sure you want to delete?
            {/* <span className={s.modalName}>"{name}"</span>? */}
          </p>
          <div className={s.modalBtn}>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => modalRef.current.close()}>Cancel</button>
          </div>
        </div>
      </dialog>
    </li>
  );
};
export default TransactionsItem;
