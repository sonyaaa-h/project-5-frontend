import s from "./TransactionsItem.module.css";
import EditIcon from "../../assets/icon-edit.svg?react";
const TransactionsItem = ({ date, type, category, comment, sum }) => {
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
          <button className={s.btnDelete}>Delete</button>
        </li>
      </ul>
    </li>
  );
};
export default TransactionsItem;
