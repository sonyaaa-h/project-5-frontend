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
  backgroundColor: "#fcfcfc",
  display: "flex",
  alignItems: "center",
  overflow: "visible",

  "& .MuiSwitch-switchBase": {
    top: "50%",
    transform: "translateY( -50%)",
    padding: 0,
    "&.Mui-checked": {
      transform: "translate(40px, -50% )",
      color: "#b20202",
      backgroundColor: "#b20202",
      "& + .MuiSwitch-track": {
        backgroundColor: "#fcfcfc",
      },
      "&:hover": {
        backgroundColor: "inherit",
      },
      "&.Mui-checked:hover": {
        backgroundColor: "#b20202",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "inherit",
        boxShadow: "none",
      },
    },
    color: "#dfad3f",
    backgroundColor: "#dfad3f",
    "&:hover": {
      backgroundColor: "#dfad3f",
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
    backgroundColor: "#fcfcfc",
    opacity: 1,
  },
}));

export default function Toggle({ isIncome, setIsIncome }) {
  const handleChange = (event) => {
    setIsIncome(event.target.checked);
  };

  return (
    <CustomSwitch
      checked={isIncome}
      onChange={handleChange}
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
          {PlusIcon}
        </span>
      }
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
          {MinusIcon}
        </span>
      }
      inputProps={{ "aria-label": "color switch demo" }}
    />
  );
}
