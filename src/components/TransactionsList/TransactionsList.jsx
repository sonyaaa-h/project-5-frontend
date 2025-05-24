import { useDispatch, useSelector } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import s from "./TransactionsList.module.css";
import { useEffect } from "react";
import { fetchTransactions } from "../../redux/transactions/operations.js";
import { selectTransactions } from "../../redux/transactions/selectors.js";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  // const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  console.log("transaction", transactions);

  if (transactions.length === 0) {
    return (
      <p>You don't have any transactions yet. Start by adding a new one!</p>
    );
  }
  // if (error) {
  //   return <p>Error loading transactions: {error.message}</p>;
  // }

  return (
    <div className={s.wrapper}>
      <ul className={s.titles}>
        <li className={s.date}>Date</li>
        <li className={s.type}>Type</li>
        <li className={s.category}>Category</li>
        <li className={s.comment}>Comment</li>
        <li className={s.sum}>Sum</li>
      </ul>
      <div className={s.transactionsScroll}>
        <ul className={s.wrapperTransactions}>
          {(transactions || []).map((transaction) => (
            <TransactionsItem key={transaction._id} {...transaction} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TransactionsList;
