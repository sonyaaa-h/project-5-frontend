import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import css from './ModalAddTransaction.module.css';
import { IoAddOutline } from 'react-icons/io5';
import { FiMinus } from 'react-icons/fi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IoCloseOutline } from 'react-icons/io5';
import { addTransaction } from '../../redux/transactions/operations';
import Select from 'react-select';
import customSelectStyles from './customSelectStyles';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import { fetchCategories } from '../../redux/categories/operations';
import { api } from '../../redux/auth/operations';

const ModalAddTransaction = ({ openModal, closeModal, setBalance }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState('expense');
  const token = useSelector(state => state.auth.token);
  const categories = useSelector(state => state.categories.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const schema = yup.object().shape({
    money: yup
      .number()
      .typeError('Money must be a number')
      .positive('Money must be positive')
      .required('Money is required'),
    comment: yup.string().max(50, 'Comment must be at most 50 characters'),
    category: yup.string().when('transactionType', {
      is: 'expense',
      then: schema => schema.required('Category is required'),
      otherwise: schema => schema.notRequired(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    if (transactionType === 'expense' && !data.category) {
      iziToast.error({
        title: 'Error',
        message: 'Please select a category',
        position: 'topRight',
        timeout: 5000,
        close: true,
        progressBar: true,
        backgroundColor: '#ff4d4f',
        messageColor: '#fff',
        titleColor: '#fff',
      });
      return;
    }
    const payload = {
      type: transactionType === 'income' ? '+' : '-',
      category: transactionType === 'income' ? 'Income' : data.category,
      date: startDate.toISOString(),
      summ: Number(data.money),
      comment: data.comment,
    };

    try {
      await dispatch(addTransaction(payload)).unwrap();
      const res = await api.get('/sidebar/balance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalance(res.data.balance || 0);
      reset();
      closeModal();
    } catch (err) {
      iziToast.error({
        title: 'Error',
        message:
          err?.response?.data?.message ||
          'Something went wrong. Please try again!',
        position: 'topRight',
        timeout: 5000,
        close: true,
        progressBar: true,
        backgroundColor: '#ff4d4f',
        messageColor: '#fff',
        titleColor: '#fff',
      });
    }
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openModal]);

  if (!openModal) {
    return null;
  }

  // Проверка данных категорий и фильтрации
  console.log('Categories:', categories);
  console.log('Transaction Type:', transactionType);

  const categoryOptions = Array.isArray(categories.data)
    ? categories.data
        .filter(category => category.type === transactionType)
        .map(category => ({
          value: category._id,
          label: category.name,
        }))
    : [];

  console.log('Filtered Category Options:', categoryOptions);

  return (
    <div className={css.backdrop} onClick={closeModal}>
      <div className={css.modalContent} onClick={e => e.stopPropagation()}>
        <div className={css.addModalWrapp}>
          <p className={css.addTransaction}>Add transaction</p>
          <div className={css.typeTransaction}>
            <p
              onClick={() => setTransactionType('income')}
              className={clsx(
                css.income,
                transactionType === 'income' && css.active,
              )}
            >
              Income
            </p>
            <button className={css.closeIconBtn} onClick={closeModal}>
              <IoCloseOutline className={css.closeIcon} />
            </button>

            <div
              onClick={() =>
                setTransactionType(prev =>
                  prev === 'income' ? 'expense' : 'income',
                )
              }
              className={clsx(
                css.btnTypeWrapp,
                transactionType === 'expense' && css.expenseActive,
              )}
            >
              <button
                className={clsx(
                  css.btnType,
                  transactionType === 'expense' && css.btnTypeExpense,
                )}
              >
                {transactionType === 'income' ? (
                  <IoAddOutline className={css.btnIconType} />
                ) : (
                  <FiMinus />
                )}
              </button>
            </div>
            <p
              onClick={() => setTransactionType('expense')}
              className={clsx(
                css.expense,
                transactionType === 'expense' && css.activeExpense,
              )}
            >
              Expense
            </p>
          </div>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            {transactionType === 'expense' && (
              <div className={css.selectWrapp}>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={categoryOptions}
                      placeholder="Select a category"
                      classNamePrefix="customSelect"
                      styles={customSelectStyles}
                      onChange={option => field.onChange(option.value)}
                      value={categoryOptions.find(
                        option => option.value === field.value,
                      )}
                    />
                  )}
                />
                {errors.category && (
                  <p className={css.errMoney}>{errors.category.message}</p>
                )}
              </div>
            )}
            <div className={css.tabletWrap}>
              <div className={css.moneyWrapp}>
                <input
                  type="number"
                  {...register('money', { required: 'This is required' })}
                  className={css.money}
                  placeholder="0.00"
                />
                {errors.money?.message && (
                  <p className={css.errMoney}>{errors.money?.message}</p>
                )}
              </div>
              <div className={css.dateWrapp}>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  className={css.date}
                />
                <FaRegCalendarAlt className={css.calendarIcon} />
              </div>
            </div>
            <div className={css.moneyWrapp}>
              <textarea
                {...register('comment', { required: 'This is required' })}
                className={css.comment}
                placeholder="Comment"
              />
              {errors.comment?.message && (
                <p className={css.errMoney}>{errors.comment?.message}</p>
              )}
            </div>
            <div className={css.btnWrapp}>
              <button type="submit" className={css.btnAdd}>
                Add
              </button>
              <button
                type="button"
                className={css.btnCancel}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
