import * as React from "react";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Color switch demo" } };

export default function ColorSwitches({ isIncome, setIsIncome }) {
  const handleChange = (event) => {
    setIsIncome(event.target.checked);
  };
  return (
    <div>
      <Switch
        {...label}
        defaultChecked
        color="warning"
        checked={isIncome}
        onChange={handleChange}
      />
    </div>
  );
}
