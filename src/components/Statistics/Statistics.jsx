import React, from "react";
import PieChartWithPaddingAngle from "../PieChartWithPaddingAngle/PieChartWithPaddingAngle";
import s from "./Statistics.module.css";
import ColorSwitches from "../SwitchButton/SwithButton";

const Statistics = () => {
  const expensesData = [
    { color: "#f8b84e", category: "Main expenses", sum: 8700.0 },
    { color: "#fbc2eb", category: "Products", sum: 3800.74 },
    { color: "#ff8fa3", category: "Car", sum: 1500.0 },
    { color: "#dab6fc", category: "Self care", sum: 800.0 },
    { color: "#c8f4f9", category: "Child care", sum: 2208.5 },
    { color: "#6c63ff", category: "Household products", sum: 300.0 },
    { color: "#a0e7e5", category: "Education", sum: 3400.0 },
    { color: "#5bd7b7", category: "Leisure", sum: 1230.0 },
    { color: "#40916c", category: "Other expenses", sum: 610.0 },
  ];

  const total = expensesData
    .reduce((acc, item) => acc + item.sum, 0)
    .toFixed(2);

  return (
    <section id="statistic" className={s.statistics}>
      <p className={s.pStatistics}>Income <ColorSwitches/> Expense</p>
      <PieChartWithPaddingAngle />
      <select
        id="monthSelect"
        name="monthSelect"
        className={s.selectStatistics}
      >
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <select id="yearSelect" name="yearSelect" className={s.selectStatistics}>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>
      <div className={s.tableDivStatistics}>
        <table className={s.tableStatistics}>
          <thead>
            <tr className={s.trStatistics}>
              <th className={s.thStatistics}>Category</th>
              <th className={s.thStatistics}>Sum</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map((item, index) => (
              <tr key={index} className={s.trStatistics}>
                <td className={s.tdStatistics}>
                  <span style={{ backgroundColor: item.color }}></span>
                  {item.category}
                </td>
                <td>
                  {item.sum.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Expenses:</td>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default Statistics;
