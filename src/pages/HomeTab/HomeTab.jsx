import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import { fetchCategories } from "../../redux/categories/operations";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import AddTransactionButton from "../../components/buttonadd/ButtonAddTransaction";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";

const HomeTab = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);
  console.log(token);

  useEffect(() => {
    if (!token) return;
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch, token]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <TransactionsList />
      <AddTransactionButton openModal={handleOpenModal} />
      <ModalAddTransaction
        openModal={showModal}
        closeModal={handleCloseModal}
        setBalance={() => {}}
      />
    </div>
  );
};

export default HomeTab;
