import styles from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <p className={styles.error}>
      Sorry, something went wrong...Reload page later!
    </p>
  );
}
