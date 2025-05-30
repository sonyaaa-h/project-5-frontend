import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import { fetchCategories } from "../../redux/categories/operations";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import AddTransactionButton from "../../components/buttonadd/ButtonAddTransaction";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import { useMediaQuery } from "react-responsive";
import Ballance from "../../components/Ballance/Ballance";
import c from "./HomeTab.module.css";
import { selectIsLoading } from "../../redux/global/selectors";

const HomeTab = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (token) {
      dispatch(fetchTransactions());
      dispatch(fetchCategories());
    }
  }, [dispatch, token]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <div className={c.wrapperHome}>
      {isMobile && <Ballance />}
      <TransactionsList />
      {!isLoading && <AddTransactionButton openModal={handleOpenModal} />}
      <ModalAddTransaction
        openModal={showModal}
        closeModal={handleCloseModal}
        setBalance={() => {}}
      />
    </div>
  );
};

export default HomeTab;
