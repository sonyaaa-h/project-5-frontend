import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import { fetchCategories } from "../../redux/categories/operations";
import TransactionsList from "../../components/TransactionsList/TransactionsList";

const HomeTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  return <div><TransactionsList/></div>;
};
export default HomeTab;
