import s from "./TransactionsItem.module.css";
import EditIcon from "../../assets/icon-edit.svg?react";

import ModalDeleteTransaction from "../ModalDeleteTransaction/ModalDeleteTransaction.jsx";
import { useState } from "react";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm.jsx";
import { useMediaQuery } from "react-responsive";
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

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const sumClass = type === "+" ? s.sumIncome : s.sumExpense;

  return (
    <li
      className={isMobile ? s.mobileWrapperTransaction : s.wrapperTransaction}
    >
      {isMobile ? (
    
        <>
          <div className={s.mobileRow}>
            <span className={s.label}>Date</span>
            <span className={s.value}>{formatDate(date)}</span>
          </div>
          <div className={s.mobileRow}>
            <span className={s.label}>Type</span>
            <span className={s.value}>{type}</span>
          </div>
          <div className={s.mobileRow}>
            <span className={s.label}>Category</span>
            <span className={s.value}>{category}</span>
          </div>
          <div className={s.mobileRow}>
            <span className={s.label}>Comment</span>
            <span className={s.value}>{comment}</span>
          </div>
          <div className={`${s.mobileRow} ${s.sumRow}`}>
            <span className={s.label}>Sum</span>
            <span className={`${s.value} ${sumClass}`}>{sum.toFixed(2)}</span>
          </div>
          <div className={s.mobileActions}>
            <button className={s.btnDelete} onClick={handleDeleteClick}>
              Delete
            </button>
            <button className={s.btnEdit} onClick={handleEditClick}>
              <EditIcon className={s.icon} />
              Edit
            </button>
          </div>
        </>
      ) : (
        <ul className={s.transaction}>
          <li>{formatDate(date)}</li>
          <li>{type}</li>
          <li>{category}</li>
          <li>{comment}</li>
          <li>{sum.toFixed(2)}</li>
          <li>
            <EditIcon className={s.icon} onClick={handleEditClick} />
            <button className={s.btnDelete} onClick={handleDeleteClick}>
              Delete
            </button>
          </li>
        </ul>)}
      
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
