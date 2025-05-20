import { IoAddOutline } from "react-icons/io5";
import css from "./ButtonAddTransaction.module.css";

const ButtonAddTransactions = ({ openModal }) => {
  return (
    <div className={css.btnAddWrapp}>
      <button className={css.iconWrapp} type="button" onClick={openModal}>
        <IoAddOutline className={css.iconAdd} />
      </button>
    </div>
  );
};

export default ButtonAddTransactions;
