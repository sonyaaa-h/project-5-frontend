import * as React from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const PlusIcon = (
  <svg
    width="24"
    height="24"
    viewBox="3 2 17 20"
    fill="none"
    stroke="#fcfcfc"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = (
  <svg
    width="24"
    height="24"
    viewBox="3 2 17 20"
    fill="none"
    stroke="#fcfcfc"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  height: 40,
  padding: 0,
  borderRadius: 30,
  backgroundColor: "#fcfcfc", // Загальний фон доріжки перемикача
  display: "flex",
  alignItems: "center",
  overflow: "visible",

  "& .MuiSwitch-switchBase": {
    top: "50%",
    // Изначальное (неchecked) состояние - ползунок справа, цвет расхода
    transform: "translate(40px, -50%)", // Перемещаем ползунок вправо в неchecked состоянии
    padding: 0,
    color: "#b20202", // Цвет ползунка для расхода (минус)
    backgroundColor: "#b20202", // Фон ползунка для расхода
    "&:hover": {
      backgroundColor: "#b20202", // Цвет при наведении для расхода
    },

    "&.Mui-checked": {
      // Checked состояние - ползунок слева, цвет дохода
      transform: "translate(0, -50%)", // Перемещаем ползунок влево (начальная позиция) в checked состоянии
      color: "#dfad3f", // Цвет ползунка для дохода (плюс)
      backgroundColor: "#dfad3f", // Фон ползунка для дохода
      "& + .MuiSwitch-track": {
        backgroundColor: "#fcfcfc", // Фон дорожки остается белым
      },
      "&:hover": {
        backgroundColor: "inherit", // Сброс цвета при наведении (по умолчанию MUI)
      },
      "&.Mui-checked:hover": {
        backgroundColor: "#dfad3f", // Цвет при наведении для дохода
      },
      "&.Mui-focusVisible": {
        backgroundColor: "inherit",
        boxShadow: "none",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "100%",
    width: 28,
    height: 28,
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  "& .MuiSwitch-track": {
    borderRadius: 30,
    backgroundColor: "#fcfcfc", // Общий фон дорожки
    opacity: 1,
  },
}));

export default function ToggleForEdit({ isIncome, setIsIncome }) {
  const handleChange = (event) => {
    setIsIncome(event.target.checked);
  };

  return (
    <CustomSwitch
      checked={isIncome}
      onChange={handleChange}
      // Меняем местами иконки:
      // Если НЕ checked (isIncome === false), показываем MinusIcon
      icon={
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
          }}
        >
          {MinusIcon}
        </span>
      }
      // Если checked (isIncome === true), показываем PlusIcon
      checkedIcon={
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
          }}
        >
          {PlusIcon}
        </span>
      }
      inputProps={{ "aria-label": "color switch demo" }}
    />
  );
}