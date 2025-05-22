import React, { useEffect, useState } from "react";
import PieChartWithPaddingAngle from "../PieChartWithPaddingAngle/PieChartWithPaddingAngle";
import s from "./Statistics.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "../../redux/statistics/operations";
import Toggle from "../Toggle/Toggle";

const Statistics = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2025");
  const [isIncome, setIsIncome] = useState(true);

  const { data, isLoading, error } = useSelector((state) => state.statistics);
  const categories = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(fetchStatistics({ year, month }));
  }, [year, month, dispatch]);

  const filteredData = isIncome
    ? Object.entries(data?.expense?.byCategory || {}).map(
        ([category, sum]) => ({
          type: "+",
          category,
          sum,
        })
      )
    : Object.entries(data?.income?.byCategory || {}).map(([category, sum]) => ({
        type: "-",
        category,
        sum,
      }));

  const groupedByCategory = filteredData.reduce((acc, transaction) => {
    const { category, sum } = transaction;
    acc[category] = (acc[category] || 0) + Number(sum);
    return acc;
  }, {});

  const dataWithColor = Object.entries(groupedByCategory).map(
    ([categoryName, sum]) => {
      const category = categories.data.find((cat) => cat.name === categoryName);
      return {
        category: categoryName,
        sum,
        color: category?.color || "#CCCCCC",
      };
    }
  );

  const total = filteredData
    .reduce((sum, item) => sum + Number(item.sum), 0)
    .toFixed(2);

  return (
    <section id="statistic" className={s.statistics}>
      <div className={s.firstBlock}>
        <div className={s.pStatistics}>
          Income <Toggle isIncome={isIncome} setIsIncome={setIsIncome} />{" "}
          Expense
        </div>
        <PieChartWithPaddingAngle data={dataWithColor} total={total} />
      </div>
      <div className={s.secondBlock}>
        <div className={s.selectBlock}>
          <select
            id="monthSelect"
            name="monthSelect"
            className={s.selectStatistics}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option className={s.optionStatistics} value="01">
              January
            </option>
            <option className={s.optionStatistics} value="02">
              February
            </option>
            <option className={s.optionStatistics} value="03">
              March
            </option>
            <option className={s.optionStatistics} value="04">
              April
            </option>
            <option className={s.optionStatistics} value="05">
              May
            </option>
            <option className={s.optionStatistics} value="06">
              June
            </option>
            <option className={s.optionStatistics} value="07">
              July
            </option>
            <option className={s.optionStatistics} value="08">
              August
            </option>
            <option className={s.optionStatistics} value="09">
              September
            </option>
            <option className={s.optionStatistics} value="10">
              October
            </option>
            <option className={s.optionStatistics} value="11">
              November
            </option>
            <option className={s.optionStatistics} value="12">
              December
            </option>
          </select>
          <select
            id="yearSelect"
            name="yearSelect"
            className={s.selectStatistics}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option className={s.optionStatistics} value="2020">
              2020
            </option>
            <option className={s.optionStatistics} value="2021">
              2021
            </option>
            <option className={s.optionStatistics} value="2022">
              2022
            </option>
            <option className={s.optionStatistics} value="2023">
              2023
            </option>
            <option className={s.optionStatistics} value="2024">
              2024
            </option>
            <option className={s.optionStatistics} value="2025">
              2025
            </option>
          </select>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className={s.tableStatistics}>
            <thead className={s.theadStatistics}>
              <tr>
                <th className={s.thStatistics}>Category</th>
                <th className={s.thStatistics}>Sum</th>
              </tr>
            </thead>
            <tbody className={s.tbodyStatistics}>
              {dataWithColor.map((item, index) => (
                <tr key={index} className={s.trStatistics}>
                  <td className={s.tdStatistics}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "24px",
                        height: "24px",
                        backgroundColor: item.color,
                        marginRight: "24px",
                        borderRadius: "2px",
                      }}
                    ></span>
                    {item.category}
                  </td>
                  <td className={s.tdStatistics}>
                    {item.sum.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className={s.tfootStatistics}>
              <tr>
                <td className={s.tdStatistics}>
                  {isIncome ? "Expenses:" : "Income"}
                </td>
                <td
                  className={s.tdStatistics}
                  style={{ color: isIncome ? "#f23a3a" : "#24cca7" }}
                >
                  {total}
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </section>
  );
};

export default Statistics;
