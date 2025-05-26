import { useDispatch, useSelector } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import s from "./TransactionsList.module.css";
import { useEffect } from "react";
import { fetchTransactions } from "../../redux/transactions/operations.js";
import {
    selectPagination,
    selectTransactions,
} from "../../redux/transactions/selectors.js";

import { useMediaQuery } from "react-responsive";

const TransactionsList = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);
    const paginationInfo = useSelector(selectPagination);
    const { page, hasNextPage } = paginationInfo || {};
    // const error = useSelector(selectError);
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    useEffect(() => {
        dispatch(fetchTransactions(1));
    }, [dispatch]);

    const handleLoadMore = () => {
        dispatch(fetchTransactions(page + 1));
    };

    if (transactions.length === 0) {
        return (
            <p className={s.noneTransText}>
                You don't have any transactions yet. Start by adding a new one!
            </p>
        );
    }

    // if (error) {
    //   return <p>Error loading transactions: {error.message}</p>;
    // }

    return (
        <div className={s.wrapper}>
            {!isMobile && (
                <ul className={s.titles}>
                    <li className={s.date}>Date</li>
                    <li className={s.type}>Type</li>
                    <li className={s.category}>Category</li>
                    <li className={s.comment}>Comment</li>
                    <li className={s.sum}>Sum</li>
                </ul>
            )}

            <div className={s.transactionsScroll}>
                <ul className={s.wrapperTransactions}>
                    {(transactions || []).map((transaction) => (
                        <TransactionsItem key={transaction._id} {...transaction} />
                    ))}
                </ul>
            </div>
            {hasNextPage && (
                <button className={s.moreBtn} onClick={handleLoadMore}>
                    Load more
                </button>
            )}
        </div>
    );
};
export default TransactionsList;
