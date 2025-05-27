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
import iziToast from "izitoast"; // Зверніть увагу: iziToast використовується тут, але toast з react-hot-toast також імпортується
import { fetchCategories } from "../../redux/categories/operations";
import { getCurrentUserThunk } from "../../redux/auth/operations";
import toast from "react-hot-toast"; // Цей toast також використовується

const ModalAddTransaction = ({ openModal, closeModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState("expense"); // Початковий тип "expense"
  // const [expenseOptions, setExpenseOptions] = useState([]); // Цей стан більше не потрібен
  const categories = useSelector((state) => state.categories.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Оновлена схема валідації: категорія тепер завжди обов'язкова
  const schema = yup.object().shape({
    money: yup
      .number()
      .required("Amount is required")
      .typeError("Amount must be a number")
      .positive("Amount must be positive"),
    comment: yup.string().max(50, "Comment must be at most 50 characters"),
    // Категорія тепер обов'язкова, незалежно від типу транзакції
    category: yup.string().required("Category is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue, // Додано setValue для програмної зміни значень полів форми
  } = useForm({
    resolver: yupResolver(schema),
    context: { transactionType }, // Передаємо transactionType в контекст валідації
    defaultValues: {
      category: "", // Встановлюємо значення за замовчуванням для категорії
      money: "",
      comment: "",
    },
  });

  // useEffect для expenseOptions більше не потрібен, оскільки categoryOptions
  // обчислюється динамічно перед рендерингом

  // Функція для зміни типу транзакції та скидання категорії
  const handleTransactionTypeChange = (newType) => {
    setTransactionType(newType);
    setValue("category", null); // Скидаємо вибрану категорію при зміні типу
    // resetField("category"); // Альтернатива setValue("category", null);
  };

  const onSubmit = async (data) => {
    // Ручна перевірка категорії видалена, оскільки її обробляє Yup
    const selectedCategory = categories?.find(
      (cat) => cat._id === data.category
    );

    // Перевіряємо, чи знайдено категорію, якщо вона обов'язкова
    if (!selectedCategory) {
      // Цей блок може бути менш необхідним, якщо валідація YUP працює коректно,
      // але додаємо для безпеки, якщо data.category пройшло крізь YUP без _id
      iziToast.error({
        title: "Error",
        message: "Invalid category selected.",
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

    const categoryName = selectedCategory.name; // Використовуємо назву категорії

    const formatDate = (date) => {
      // Перейменував параметр, щоб уникнути конфлікту з "data"
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const payload = {
      date: formatDate(startDate),
      type: transactionType === "income" ? "+" : "-",
      category: categoryName, // Передаємо назву категорії
      comment: data.comment,
      sum: Number(data.money),
    };
    console.log(payload);

    try {
      await dispatch(addTransaction(payload)).unwrap();
      await dispatch(getCurrentUserThunk()).unwrap(); // Оновлення балансу користувача
      toast.success(`Transaction added successfully!`);
      reset(); // Скидаємо форму після успішної відправки
      setStartDate(new Date()); // Скидаємо дату до поточної
      setTransactionType("expense"); // Скидаємо тип до початкового
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
      reset(); // Скидаємо форму при закритті модалки
      setStartDate(new Date()); // Скидаємо дату
      setTransactionType("expense"); // Скидаємо тип
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal, reset]); // Додано reset в залежності

  if (!openModal) return null;

  // Динамічне обчислення categoryOptions на основі transactionType
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
              onClick={() => handleTransactionTypeChange("income")}
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
                handleTransactionTypeChange(
                  transactionType === "income" ? "expense" : "income"
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
              onClick={() => handleTransactionTypeChange("expense")}
              className={clsx(
                css.expense,
                transactionType === "expense" && css.activeExpense
              )}
            >
              Expense
            </p>
          </div>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
                    onChange={(option) => {
                      field.onChange(option ? option.value : null);
                    }}
                    value={
                      categoryOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    }
                  />
                )}
              />
              {errors.category && (
                <p className={css.errMoney}>{errors.category.message}</p>
              )}
            </div>

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
                  className={css.date}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  toggleCalendarOnIconClick
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
