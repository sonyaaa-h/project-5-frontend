import React from "react";
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./EditTransactionForm.module.css";

export const EditTransactionForm = ({ mode = 'edit' }) => {
  const [transactionType, setTransactionType] = React.useState("income");
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          {mode === 'edit' ? 'Edit' : 'Add'} transaction
        </h2>

        <div className={styles.buttonGroup}>
          <button className={styles.saveButton}>
            Save
          </button>

          <button className={styles.cancelButton}>
            Cancel
          </button>
        </div>

        <input
          className={styles.descriptionInput}
          placeholder="Description"
        />

        <div className={styles.inputGroup}>
          <input
            className={styles.amountInput}
            placeholder="Amount"
          />

          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            className={styles.datePicker}
            dateFormat="dd/MM/yyyy"
            showIcon
            toggleCalendarOnIconClick
          />
        </div>

        <div className={styles.toggleGroup}>
          <div
            className={`${styles.toggleOption} ${transactionType === "income" ? styles.active : ""}`}
            onClick={() => setTransactionType("income")}
          >
            Income
          </div>

          <div className={styles.toggleSwitch}>
            <div className={styles.toggleIndicator}>+</div>
          </div>

          <div
            className={`${styles.toggleOption} ${transactionType === "expense" ? styles.active : ""}`}
            onClick={() => setTransactionType("expense")}
          >
            Expense
          </div>
        </div>
      </div>
    </div>
  );
};

EditTransactionForm.propTypes = {
  mode: PropTypes.oneOf(['edit', 'add']),
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};