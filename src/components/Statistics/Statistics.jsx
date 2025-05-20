import React, { useEffect, useState } from "react";
import PieChartWithPaddingAngle from "../PieChartWithPaddingAngle/PieChartWithPaddingAngle";
import s from "./Statistics.module.css";
import ColorSwitches from "../SwitchButton/SwithButton";
import { fetchStatistics } from "../../redux/statistics/operations";
import { useDispatch, useSelector } from "react-redux";

const Statistics = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2025");
  const [operation, setOperation] = useState("Expense");

  const { data, isLoading, error } = useSelector((state) => state.statistics);
  const categories = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(fetchStatistics({ year, month }));
  }, [year, month, dispatch]);
  const expensesData = data?.expenses || [];
  const total = data?.totalExpenses?.toFixed(2) || "0.00";

  const expensesWithColor = expensesData.map((item) => {
    const category = categories.find((cat) => cat.name === item.category);
    return {
      ...item,
      color: category ? category.color : "#CCCCCC",
    };
  });
  return (
    <section id="statistic" className={s.statistics}>
      <p className={s.pStatistics}>
        Income <ColorSwitches /> Expense
      </p>
      <PieChartWithPaddingAngle />
      <select
        id="monthSelect"
        name="monthSelect"
        className={s.selectStatistics}
        value={month}
        onChange={(e) => setMonth(e.target.value)}
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
      <select
        id="yearSelect"
        name="yearSelect"
        className={s.selectStatistics}
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={s.tableDivStatistics}>
          <table className={s.tableStatistics}>
            <thead>
              <tr className={s.trStatistics}>
                <th className={s.thStatistics}>Category</th>
                <th className={s.thStatistics}>Sum</th>
              </tr>
            </thead>
            <tbody>
              {expensesWithColor.map((item, index) => (
                <tr key={index} className={s.trStatistics}>
                  <td className={s.tdStatistics}>
                    <span></span>
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
      )}
    </section>
  );
};

export default Statistics;
