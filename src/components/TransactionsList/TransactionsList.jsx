import TransactionsItem from "../TransactionsItem/TransactionsItem";
import s from "./TransactionsList.module.css"

const initialTransactions = [
    {
        id: 1,
        date: "2025-05-18",
        type: "+",
        category: "Salary",
        comment: "Monthly salary",
        sum: 5000,
    },
    {
        id: 2,
        date: "2025-05-17",
        type: "-",
        category: "Groceries",
        comment: "Bought food",
        sum: 120,
    },
];

const TransactionsList = () => {
    return (
        <div className={s.wrapper}>
            <ul className={s.titles}>
                <li className={s.date}>Date</li>
                <li className={s.type}>Type</li>
                <li className={s.category}>Category</li>
                <li className={s.comment}>Comment</li>
                <li className={s.sum}>Sum</li>
            </ul>
            <ul>
                {initialTransactions.map((transaction) => (
                    <TransactionsItem key={transaction.id} {...transaction} />
                ))}
            </ul>
        </div>
    );
};
export default TransactionsList;
