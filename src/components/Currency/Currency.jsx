import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Currency.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import wallet from "../../assets/wallet.png";

const CURRENCY_API_URL = "https://api.monobank.ua/bank/currency";
const CACHE_KEY = "monobank_currency_cache";
const CACHE_EXPIRATION_MS = 60 * 60 * 1000;

const currencyCodes = {
  840: "USD",
  978: "EUR",
};

const Currency = () => {
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        setError(false);

        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          const { timestamp, rates } = JSON.parse(cached);
          const isCacheValid = Date.now() - timestamp < CACHE_EXPIRATION_MS;

          if (isCacheValid) {
            setRates(rates);
            return;
          }
        }

        const response = await axios.get(CURRENCY_API_URL);

        const filtered = response.data.filter(
          (item) =>
            (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
            item.currencyCodeB === 980
        );

        const cacheData = {
          timestamp: Date.now(),
          rates: filtered,
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        setRates(filtered);
      } catch (e) {
        if (e.response?.status === 429) {
          console.warn("Too many requests — Monobank rate limit exceeded.");
        }
        setError(true);
        setRates([]);
      } finally {
      }
    };

    fetchCurrency();
  }, []);

  return (
    <div className={styles.currencyBox}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Currency</th>
            <th className={styles.th}>Purchase</th>
            <th className={styles.th}>Sale</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rates.map((rate) => (
            <tr key={rate.currencyCodeA}>
              <td className={styles.td}>{currencyCodes[rate.currencyCodeA]}</td>
              <td className={styles.td}>
                {rate.rateBuy ? rate.rateBuy.toFixed(2) : "-"}
              </td>
              <td className={styles.td}>
                {rate.rateSell ? rate.rateSell.toFixed(2) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <ErrorMessage />}
      <img src={wallet} alt="wallet" className={styles.wallet} />
    </div>
  );
};

export default Currency;
