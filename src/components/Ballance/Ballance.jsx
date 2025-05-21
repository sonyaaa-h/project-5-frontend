import { useSelector } from "react-redux";
import css from "./Ballance.module.css"

const Ballance = () => {
    const balance = useSelector((state) => state.auth.user.balance);

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