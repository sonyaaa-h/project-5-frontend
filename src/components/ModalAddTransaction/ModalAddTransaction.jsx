import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import css from "./ModalAddTransaction.module.css";
import { IoAddOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoCloseOutline } from "react-icons/io5";
import { addTransaction } from "../../redux/transactions/operations";
import Select from "react-select";
import customSelectStyles from "./customSelectStyles";
import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
import { fetchCategories } from "../../redux/categories/operations";
import { getCurrentUserThunk } from "../../redux/auth/operations";

const ModalAddTransaction = ({ openModal, closeModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState("expense");
  const [expenseOptions, setExpenseOptions] = useState([]);
  const categories = useSelector((state) => state.categories.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const schema = yup.object().shape({
    money: yup
      .number()
      .typeError("Money must be a number")
      .positive("Money must be positive")
      .required("Money is required"),
    comment: yup.string().max(50, "Comment must be at most 50 characters"),
    category: yup.string().when("transactionType", {
      is: "expense",
      then: (schema) => schema.required("Category is required"),
      otherwise: (schema) => schema.notRequired(),
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
    context: { transactionType },
  });

  useEffect(() => {
    const options = categories?.map((cat) => ({
      value: typeof cat === "string" ? cat : cat.name,
      label: typeof cat === "string" ? cat : cat.name,
    }));
    setExpenseOptions(options);
  }, [categories]);
  const onSubmit = async (data) => {
    if (transactionType === "expense" && !data.category) {
      iziToast.error({
        title: "Error",
        message: "Please select a category",
        position: "topRight",
        timeout: 5000,
        close: true,
        progressBar: true,
        backgroundColor: "#ff4d4f",
        messageColor: "#fff",
        titleColor: "#fff",
      });
      return;
    }
    const formatDate = (data) => {
      const year = data.getFullYear();
      const month = String(data.getMonth() + 1).padStart(2, "0");
      const day = String(data.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const selectedCategory = categories?.find(
      (cat) => cat._id === data.category
    );
    const categoryName = selectedCategory ? selectedCategory.name : "Other";
    const payload = {
      date: formatDate(startDate),
      type: transactionType === "income" ? "+" : "-",
      category: categoryName,
      comment: data.comment,
      sum: Number(data.money),
    };
    console.log(payload);

    try {
      await dispatch(addTransaction(payload)).unwrap();
      await dispatch(getCurrentUserThunk()).unwrap();
      reset();
      closeModal();
    } catch (err) {
      iziToast.error({
        title: "Error",
        message:
          err?.response?.data?.message ||
          "Something went wrong. Please try again!",
        position: "topRight",
        timeout: 5000,
        close: true,
        progressBar: true,
        backgroundColor: "#ff4d4f",
        messageColor: "#fff",
        titleColor: "#fff",
      });
    }
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  if (!openModal) return null;

  const categoryOptions = Array.isArray(categories)
    ? categories
        .filter((category) => category.type === transactionType)
        .map((category) => ({
          value: category._id,
          label: category.name,
        }))
    : [];

  return (
    <div className={css.backdrop} onClick={closeModal}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.addModalWrapp}>
          <p className={css.addTransaction}>Add transaction</p>
          <div className={css.typeTransaction}>
            <p
              onClick={() => setTransactionType("income")}
              className={clsx(
                css.income,
                transactionType === "income" && css.active
              )}
            >
              Income
            </p>
            <button className={css.closeIconBtn} onClick={closeModal}>
              <IoCloseOutline className={css.closeIcon} />
            </button>

            <div
              onClick={() =>
                setTransactionType((prev) =>
                  prev === "income" ? "expense" : "income"
                )
              }
              className={clsx(
                css.btnTypeWrapp,
                transactionType === "expense" && css.expenseActive
              )}
            >
              <button
                className={clsx(
                  css.btnType,
                  transactionType === "expense" && css.btnTypeExpense
                )}
              >
                {transactionType === "income" ? (
                  <IoAddOutline className={css.btnIconType} />
                ) : (
                  <FiMinus />
                )}
              </button>
            </div>
            <p
              onClick={() => setTransactionType("expense")}
              className={clsx(
                css.expense,
                transactionType === "expense" && css.activeExpense
              )}
            >
              Expense
            </p>
          </div>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            {transactionType === "expense" && (
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
                      onChange={(option) => field.onChange(option.value)}
                      value={categoryOptions.find(
                        (option) => option.value === field.value
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
                  {...register("money")}
                  className={css.money}
                  placeholder="0.00"
                />
                {errors.money?.message && (
                  <p className={css.errMoney}>{errors.money.message}</p>
                )}
              </div>

              <div className={css.dateWrapp}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
                <FaRegCalendarAlt className={css.calendarIcon} />
              </div>
            </div>

            <div className={css.moneyWrapp}>
              <input
                {...register("comment")}
                className={css.comment}
                placeholder="Comment"
              />
              {errors.comment?.message && (
                <p className={css.errMoney}>{errors.comment.message}</p>
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
