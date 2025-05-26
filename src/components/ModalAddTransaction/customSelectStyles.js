const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: `2px solid ${state.isFocused ? "#6D54EB" : "#6D54EB"}`,
    boxShadow: "none",
    color: "#fff",
    minHeight: "50px",
    borderRadius: "0px",
    fontSize: "16px",
    fontWeight: "500",
    // padding: "2px 10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#2d1a5a",
    borderRadius: "12px",
    padding: "5px",
    marginTop: "8px",
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#6D54EB"
      : state.isFocused
      ? "#442877"
      : "transparent",
    color: "#fff",
    borderRadius: "8px",
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: "500",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#aaa",
    fontSize: "16px",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};

export default customSelectStyles;
