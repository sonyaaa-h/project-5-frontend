import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import { fetchCategories } from "../../redux/categories/operations";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import AddTransactionButton from "../../components/buttonadd/ButtonAddTransaction";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";

const HomeTab = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <TransactionsList />
      <AddTransactionButton onClick={handleOpenModal} />
      {showModal && <ModalAddTransaction onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default HomeTab;
