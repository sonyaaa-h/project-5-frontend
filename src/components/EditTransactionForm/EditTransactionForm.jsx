import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../ModalAddTransaction/ModalAddTransaction.module.css';
import css from './EditTransactionForm.module.css';
import { IoAddOutline, IoCloseOutline } from 'react-icons/io5';
import { FiMinus } from 'react-icons/fi';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';
import { fetchCategories } from '../../redux/categories/operations';
import Select from 'react-select';
import customSelectStyles from '../ModalAddTransaction/customSelectStyles.js';
import { IoClose } from 'react-icons/io5';

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .typeError('Amount must be a number'),
  date: Yup.date()
    .required('Date is required')
    .max(new Date(), 'Date cannot be in the future'),
  category: Yup.string().required('Category is required'),
  comment: Yup.string().max(100, 'Comment must be less than 100 characters'),
});

const EditTransactionForm = ({
  mode = 'edit',
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
  const allCategories = useSelector(state => state.categories.items || []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const initialFormValues = {
    amount: sum || '',
    date: date ? new Date(date) : new Date(),
    type: type === '+' ? 'income' : 'expense',
    category: category || '',
    comment: comment || '',
  };

  const handleCloseClick = e => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.addModalWrapp}>
          <p className={styles.addTransaction}>Edit transaction</p>

          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const transformed = {
                  _id,
                  type: values.type === 'income' ? '+' : '-',
                  sum: Number(values.amount),
                  date: values.date.toISOString(),
                  category: values.category,
                  comment: values.comment,
                };
                await onSave(transformed);
                toast.success('Transaction updated!');
                onClose();
              } catch (err) {
                toast.error('Failed to update transaction');
              } finally {
                setSubmitting(false);
              }
            }}
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => {
              const filteredCategories = allCategories.filter(
                cat => cat.type === values.type,
              );

              const categoryOptions = filteredCategories.map(cat => ({
                value: cat.name,
                label: cat.name,
              }));

              return (
                <Form className={styles.form}>
                  <button
                    type="button"
                    className={css.closeButton}
                    onClick={handleCloseClick}
                  >
                    <IoClose size={24} />
                  </button>
                  <div className={css.toggleGroup}>
                    <p
                      onClick={() => {
                        setFieldValue('type', 'income');
                        setFieldValue('category', '');
                      }}
                      className={clsx(
                        styles.income,
                        values.type === 'income' && styles.active,
                      )}
                    >
                      Income
                    </p>

                    <button className={styles.closeIconBtn} onClick={onClose}>
                      <IoCloseOutline className={styles.closeIcon} />
                    </button>

                    <div
                      onClick={() => {
                        const newType =
                          values.type === 'income' ? 'expense' : 'income';
                        setFieldValue('type', newType);
                        setFieldValue('category', '');
                      }}
                      className={clsx(
                        styles.btnTypeWrapp,
                        values.type === 'expense' && styles.expenseActive,
                      )}
                    >
                      <div
                        className={clsx(
                          styles.btnType,
                          values.type === 'expense' && styles.btnTypeExpense,
                        )}
                      >
                        {values.type === 'income' ? (
                          <IoAddOutline className={styles.btnIconType} />
                        ) : (
                          <FiMinus />
                        )}
                      </div>
                    </div>

                    <p
                      onClick={() => {
                        setFieldValue('type', 'expense');
                        setFieldValue('category', '');
                      }}
                      className={clsx(
                        styles.expense,
                        values.type === 'expense' && styles.activeExpense,
                      )}
                    >
                      Expense
                    </p>
                  </div>

                  <div className={styles.selectWrapp}>
                    <Select
                      options={categoryOptions}
                      placeholder="Select a category"
                      styles={customSelectStyles}
                      value={
                        categoryOptions.find(
                          opt => opt.value === values.category,
                        ) || null
                      }
                      onChange={option =>
                        setFieldValue('category', option ? option.value : '')
                      }
                    />
                    {errors.category && touched.category && (
                      <p className={styles.errMoney}>{errors.category}</p>
                    )}
                  </div>

                  <div className={styles.tabletWrap}>
                    <div className={styles.moneyWrapp}>
                      <Field
                        name="amount"
                        type="number"
                        placeholder="0.00"
                        className={styles.money}
                      />
                      {errors.amount && touched.amount && (
                        <p className={styles.errMoney}>{errors.amount}</p>
                      )}
                    </div>

                    <div className={styles.dateWrapp}>
                      <DatePicker
                        selected={values.date}
                        onChange={date => setFieldValue('date', date)}
                        className={styles.date}
                        dateFormat="dd/MM/yyyy"
                        toggleCalendarOnIconClick
                      />
                    </div>
                  </div>

                  <div className={styles.moneyWrapp}>
                    <Field
                      name="comment"
                      className={styles.comment}
                      placeholder="Comment"
                    />
                    {errors.comment && touched.comment && (
                      <p className={styles.errMoney}>{errors.comment}</p>
                    )}
                  </div>

                  <div className={styles.btnWrapp}>
                    <button
                      type="submit"
                      className={styles.btnAdd}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      className={styles.btnCancel}
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

EditTransactionForm.propTypes = {
  mode: PropTypes.oneOf(['edit', 'add']),
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  _id: PropTypes.string,
  date: PropTypes.string,
  type: PropTypes.oneOf(['+', '-']),
  category: PropTypes.string,
  comment: PropTypes.string,
  sum: PropTypes.number,
};

export default EditTransactionForm;
