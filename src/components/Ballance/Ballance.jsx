import { useDispatch, useSelector } from "react-redux";
import css from "./Ballance.module.css";
import { useEffect } from "react";
import { getCurrentUserThunk } from "../../redux/auth/operations.js";

const Ballance = () => {
  const balance = useSelector((state) => state.auth.user.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  return (
    <section className={css.balance}>
      <p className={css.title}>Your balance</p>
      <p className={css.amount}>
        {Number(balance).toFixed(2)}
        <span className={css.amountSpan}> UAH</span>
      </p>
    </section>
  );
};
export default Ballance;
