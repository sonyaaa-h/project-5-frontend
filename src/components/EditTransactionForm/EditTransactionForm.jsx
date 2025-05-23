import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./EditTransactionForm.module.css";
import { updateTransaction } from "../services/api"; // не знаю точно, який там путь

const EditTransactionForm = ({ mode = "edit", initialValues, onClose, onSave }) => {
  const schema = Yup.object().shape({
    amount: Yup.number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
    date: Yup.date().required("Date is required"),
    category: Yup.string().required("Category is required"),
    comment: Yup.string().max(100, "Max 100 characters"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const updatedTransaction = await updateTransaction(values.id, values);
      onSave(updatedTransaction);   // оновити список
      onClose();                    // закрити модалку
    } catch (error) {
      alert("Error: " + error.message); // можна замінити на push-сповіщення
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          {mode === "edit" ? "Edit" : "Add"} transaction
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className={styles.toggleGroup}>
                <div className={`${styles.toggleOption} ${values.type === "income" ? styles.active : ""}`}>
                  Income
                </div>
                <div className={styles.toggleSwitch}>
                  <div className={styles.toggleIndicator}>+</div>
                </div>
                <div className={`${styles.toggleOption} ${values.type === "expense" ? styles.active : ""}`}>
                  Expense
                </div>
              </div>

              <div className={styles.inputGroup}>
                <Field
                  name="amount"
                  type="number"
                  placeholder="Amount"
                  className={styles.amountInput}
                />
                <ErrorMessage name="amount" component="div" className={styles.error} />

                <DatePicker
                  selected={new Date(values.date)}
                  onChange={(date) => setFieldValue("date", date)}
                  className={styles.datePicker}
                  dateFormat="dd/MM/yyyy"
                />
                <ErrorMessage name="date" component="div" className={styles.error} />
              </div>

              <Field
                name="category"
                as="select"
                className={styles.selectInput}
              >
                <option value="">Select category</option>
                <option value="products">Products</option>
                <option value="services">Services</option>
                <option value="salary">Salary</option>
                <option value="transport">Transport</option>
              </Field>
              <ErrorMessage name="category" component="div" className={styles.error} />

              <Field
                name="comment"
                placeholder="Comment"
                className={styles.descriptionInput}
              />
              <ErrorMessage name="comment" component="div" className={styles.error} />

              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={isSubmitting}
                >
                  Save
                </button>

                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

EditTransactionForm.propTypes = {
  mode: PropTypes.oneOf(["edit", "add"]),
  initialValues: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    category: PropTypes.string.isRequired,
    comment: PropTypes.string,
    type: PropTypes.oneOf(["income", "expense"]),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditTransactionForm;