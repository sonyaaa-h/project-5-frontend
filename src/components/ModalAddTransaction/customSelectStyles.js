import { colors } from "@mui/material";

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    backgroundColor: "transparent",
    border: "2px solid #3b5d63",
    borderRadius: "8px",
    boxShadow: "none",
    minHeight: "50px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    "&:hover": {
      border: "2px solid #3b5d63",
    },
    "&:active": {
      border: "2px solid rgb(190, 223, 228)",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#3b5d63",
    borderRadius: "8px",
    padding: "5px",
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#508f8c"
      : state.isFocused
      ? "#508f8c"
      : "transparent",
    color: "#fff",
    borderRadius: "8px",
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: "500",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#081222",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#3b5d63",
    fontSize: "18px",
  }),
  input: (provided) => ({
    ...provided,
    color: "#3b5d63",
  }),
};

export default customSelectStyles;
