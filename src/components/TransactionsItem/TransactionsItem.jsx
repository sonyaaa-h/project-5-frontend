import s from "./TransactionsItem.module.css";
import EditIcon from "../../assets/icon-edit.svg?react";
// import logo from "../../assets/logo.svg";
import ModalDeleteTransaction from "../ModalDeleteTransaction/ModalDeleteTransaction.jsx";
import { useState } from "react";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm.jsx";
// import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction.jsx";


const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // місяці з 0
  const year = String(dateObj.getFullYear()).slice(-2); // останні дві цифри
  return `${day}.${month}.${year}`;
};

const TransactionsItem = ({ _id, date, type, category, comment, sum }) => {
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);

  const handleDeleteClick = () => setIsModalDelete(true);
  const handleEditClick = () => setIsModalEdit(true);

  return (
    <li className={s.wrapperTransaction}>
      <ul className={s.transaction}>
        <li>{formatDate(date)}</li>
        <li>{type}</li>
        <li>{category}</li>
        <li>{comment}</li>
        <li>{sum}</li>
        <li>
          <EditIcon className={s.icon} onClick={handleEditClick} />
          <button className={s.btnDelete} onClick={handleDeleteClick}>
            Delete
          </button>
        </li>
      </ul>
      {isModalDelete && (
        <ModalDeleteTransaction
          _id={_id}
          message="Are you sure you want to delete this transaction ?"
          comment={comment}
          onClose={() => setIsModalDelete(false)}
        />
      )}
      {isModalEdit && (
        <EditTransactionForm
          _id={_id}
          data={date}
          type={type}
          category={category}
          comment={comment}
          sum={sum}
          onClose={() => setIsModalEdit(false)}
        />
      )}
    </li>
  );
};

export default TransactionsItem;
