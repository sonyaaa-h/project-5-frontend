import s from "./TransactionsItem.module.css";
import EditIcon from "../../assets/icon-edit.svg?react";
import { useRef } from "react";
import {
  useDispatch,
  // useSelector
} from "react-redux";
import toast from "react-hot-toast";
import { deleteTransaction } from "../../redux/transactions/operations.js";
import logo from "../../assets/logo.svg";

const TransactionsItem = ({ id, date, type, category, comment, sum }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  //const token = useSelector((state) => state.auth.token);

  const handleDelete = () => {
    dispatch(deleteTransaction(id));
    toast.error(`Transaction "${comment}" is deleted!`);
    modalRef.current.close();
  };

  return (
    <li className={s.wrapperTransaction}>
      <ul className={s.transaction}>
        <li>{date}</li>
        {/* виправити формат відображення дати */}
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
