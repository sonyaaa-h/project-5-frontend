import React from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./EditTransactionForm.module.css";
import ColorSwitches from "../SwitchButton/SwitchButton";
import { toast } from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .typeError("Amount must be a number"),
  date: Yup.date()
    .required("Date is required")
    .max(new Date(), "Date cannot be in the future"),
  category: Yup.string()
    .required("Category is required"),
  comment: Yup.string()
    .max(100, "Comment must be less than 100 characters"),
});

const initialValues = {
  amount: "",
  date: new Date(),
  category: "",
  comment: "",
  type: "expense",
};

export const EditTransactionForm = ({ mode = 'edit', onClose, onSave }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Here we'll add the dispatch logic later
      console.log("Form values:", values);
      if (onSave) {
        await onSave(values);
      }
      toast.success("Transaction saved successfully!");
      if (onClose) onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save transaction");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting, resetForm }) => (
          <Form className={styles.modal}>
            <button type="button" className={styles.closeButton} onClick={handleCloseClick}>
              <IoClose size={24} />
            </button>

            <h2 className={styles.title}>
              {mode === 'edit' ? 'Edit' : 'Add'} transaction
            </h2>

            <div className={styles.toggleGroup}>
              <div
                className={`${styles.toggleOption} ${values.type === "income" ? styles.active : ""}`}
              >
                Income
              </div>

              <ColorSwitches
                isIncome={values.type === "income"}
                setIsIncome={(checked) => setFieldValue("type", checked ? "income" : "expense")}
              />

              <div
                className={`${styles.toggleOption} ${values.type === "expense" ? styles.active : ""}`}
              >
                Expense
              </div>
            </div>

            <div className={styles.inputGroup}>
              <Field
                name="amount"
                type="text"
                className={`${styles.amountInput} ${errors.amount && touched.amount ? styles.error : ""}`}
                placeholder="Amount"
              />
              {errors.amount && touched.amount && (
                <div className={styles.errorText}>{errors.amount}</div>
              )}

              <DatePicker
                selected={values.date}
                onChange={(date) => setFieldValue("date", date)}
                className={`${styles.datePicker} ${errors.date && touched.date ? styles.error : ""}`}
                dateFormat="dd/MM/yyyy"
                showIcon
                toggleCalendarOnIconClick
              />
              {errors.date && touched.date && (
                <div className={styles.errorText}>{errors.date}</div>
              )}
            </div>

            <Field
              name="category"
              as="select"
              className={`${styles.descriptionInput} ${errors.category && touched.category ? styles.error : ""}`}
            >
              <option value="">Select category</option>
              {/* Add categories here */}
            </Field>
            {errors.category && touched.category && (
              <div className={styles.errorText}>{errors.category}</div>
            )}

            <Field
              name="comment"
              className={`${styles.descriptionInput} ${errors.comment && touched.comment ? styles.error : ""}`}
              placeholder="Comment"
            />
            {errors.comment && touched.comment && (
              <div className={styles.errorText}>{errors.comment}</div>
            )}

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setFieldValue("amount", "");
                  setFieldValue("comment", "");
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

EditTransactionForm.propTypes = {
  mode: PropTypes.oneOf(['edit', 'add']),
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

export default EditTransactionForm;