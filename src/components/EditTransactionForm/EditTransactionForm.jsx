// src/components/EditTransactionForm/EditTransactionForm.jsx

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./EditTransactionForm.module.css";
import { toast } from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import ToggleForEdit from "../ToggleForEdit/ToggleForEdit";
import { fetchCategories } from "../../redux/categories/operations";

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .typeError("Amount must be a number"),
  date: Yup.date()
    .required("Date is required")
    .max(new Date(), "Date cannot be in the future"),
  // category: Yup.string().when("type", {
  //   // Category is required only if type is 'expense'
  //   is: "expense",
  //   then: Yup.string().required("Category is required"),
  //   otherwise: Yup.string().notRequired(),
  // }),
  category: Yup.string().when("type", (type, schema) => {
    return type === "expense"
      ? schema.required("Category is required")
      : schema.notRequired();
  }),
  comment: Yup.string().max(100, "Comment must be less than 100 characters"),
});

const EditTransactionForm = ({
  mode = "add",
  onClose,
  onSave,
  _id,
  date,
  type,
  category,
  comment,
  sum,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items || []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const initialFormValues = {
    amount: mode === "edit" ? sum : "", // Подгружается sum для редактирования, пусто для добавления
    date: mode === "edit" && date ? new Date(date) : new Date(), // <-- ИЗМЕНЕНО: Возвращаем логику даты
    type: mode === "edit" ? (type === "+" ? "income" : "expense") : "income", // Это остается, так как связано с состоянием переключателя
    category: mode === "edit" ? category : "", // Подгружается category для редактирования, пусто для добавления
    comment: mode === "edit" ? comment : "", // Подгружается comment для редактирования, пусто для добавления
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const transformedValues = {
        _id,
        type: values.type === "income" ? "+" : "-",
        sum: values.amount, // перейменовуємо
        date: values.date.toISOString(), // конвертуємо дату
        category: values.type === "income" ? "" : values.category,
        comment: values.comment,
      };

      if (onSave) {
        await onSave(transformedValues); // Передаємо у onSave
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
      onClose(); // Закрываем модальное окно при клике на оверлей
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    if (onClose) {
      onClose(); // Закрываем модальное окно при клике на крестик
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} // Важно для обновления initialValues при изменении пропсов
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form className={styles.modal}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleCloseClick}
            >
              <IoClose size={24} />
            </button>

            <h2 className={styles.title}>
              {mode === "edit" ? "Edit" : "Add"} transaction
            </h2>

            <div className={styles.toggleGroup}>
              <div
                className={`${styles.toggleOption} ${
                  values.type === "income" ? styles.active : ""
                }`}
              >
                Income
              </div>

              <ToggleForEdit
                isIncome={values.type === "income"}
                setIsIncome={(checked) =>
                  setFieldValue("type", checked ? "income" : "expense")
                }
              />

              <div
                className={`${styles.toggleOption} ${
                  values.type === "expense" ? styles.active : ""
                }`}
              >
                Expense
              </div>
            </div>

            {/* Поле Category отображается только если тип 'expense' */}
            {values.type === "expense" && (
              <>
                <Field
                  name="category"
                  as="select"
                  className={`${styles.categorySelect} ${
                    errors.category && touched.category ? styles.error : ""
                  }`}
                >
                  {categories.map((categoryItem) => (
                    <option key={categoryItem._id} value={categoryItem.name}>
                      {categoryItem.name}
                    </option>
                  ))}
                </Field>
                {errors.category &&
                  touched.category &&
                  values.type === "expense" && (
                    <div className={styles.errorText}>{errors.category}</div>
                  )}
              </>
            )}

            <div
              className={`${styles.inputGroup} ${
                values.type === "income" ? styles.incomeMode : ""
              }`}
            >
              <Field
                name="amount"
                type="text"
                className={`${styles.amountInput} ${
                  errors.amount && touched.amount ? styles.error : ""
                }`}
                placeholder="Amount"
              />
              <DatePicker
                selected={values.date}
                onChange={(date) => setFieldValue("date", date)}
                className={`${styles.datePicker} ${
                  errors.date && touched.date ? styles.error : ""
                }`}
                dateFormat="dd/MM/yyyy"
                showIcon
                toggleCalendarOnIconClick
              />
            </div>
            {errors.amount &&
              touched.amount && ( // Отдельно выводим ошибки для amount
                <div className={styles.errorText}>{errors.amount}</div>
              )}
            {errors.date &&
              touched.date && ( // Отдельно выводим ошибки для date
                <div className={styles.errorText}>{errors.date}</div>
              )}

            <Field
              name="comment"
              className={`${styles.descriptionInput} ${
                errors.comment && touched.comment ? styles.error : ""
              }`}
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
                  setFieldValue("amount", ""); // Очищаем поле Amount
                  setFieldValue("comment", ""); // Очищаем поле Comment
                  // Модальное окно не закрывается при отмене
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
  mode: PropTypes.oneOf(["edit", "add"]),
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  _id: PropTypes.string,
  date: PropTypes.string,
  type: PropTypes.oneOf(["+", "-"]),
  category: PropTypes.string,
  comment: PropTypes.string,
  sum: PropTypes.number,
};

export default EditTransactionForm;
