import { useEffect } from "react";
import PieChartWithPaddingAngle from "../PieChartWithPaddingAngle/PieChartWithPaddingAngle";
import s from "./Statistics.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "../../redux/statistics/operations";
import Toggle from "../Toggle/Toggle";
import wallet from "../../assets/wallet.png";
import Select from "react-select";
import { options1, options2 } from "../../utils/selectValue";
import "./selectStyles.css";
import { setIsIncome, setMonth, setYear } from "../../redux/statistics/slice";

const Statistics = () => {
  const dispatch = useDispatch();
  const month = useSelector((state) => state.statistics.month);
  const year = useSelector((state) => state.statistics.year);
  const isIncome = useSelector((state) => state.statistics.isIncome);

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
      const category = categories?.find((cat) => cat.name === categoryName);
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
          <span className={s.income}>Income</span>
          <Toggle
            isIncome={isIncome}
            setIsIncome={(value) => dispatch(setIsIncome(value))}
          />
          <span className={s.expense}>Expense</span>
        </div>
        {dataWithColor.length > 0 && (
          <PieChartWithPaddingAngle data={dataWithColor} total={total} />
        )}
      </div>
      <div className={s.secondBlock}>
        <div className={s.selectBlock}>
          <Select
            options={options2}
            id="monthSelect"
            name="monthSelect"
            className="selectStatistics"
            classNamePrefix="selectStatistics"
            value={
              options2.find((option) => option.value === String(month)) || null
            }
            onChange={(selected) => dispatch(setMonth(selected.value))}
          />

          <Select
            options={options1}
            id="yearSelect"
            name="yearSelect"
            className="selectStatistics"
            classNamePrefix="selectStatistics"
            value={
              options1.find((option) => option.value === String(year)) || null
            }
            onChange={(selected) => dispatch(setYear(selected.value))}
          />
        </div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              margin: "0 auto",
              position: "absolute",
              right: "30%",
              top: "30%",
            }}
          ></div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : dataWithColor.length === 0 ? (
          <div className={s.noDataContainer}>
            <img src={wallet} alt="No data" className={s.noDataImage} />
            <p className={s.noDataText}>No transactions for this period </p>
          </div>
        ) : (
          <table className={s.tableStatistics}>
            <thead className={s.theadStatistics}>
              <tr className={s.trhStatistics}>
                <th className={s.thStatistics}>Category</th>
                <th className={s.thStatistics}>Sum</th>
              </tr>
            </thead>
            <tbody className={s.tbodyStatistics}>
              {dataWithColor.map((item, index) => (
                <tr key={index} className={s.trStatistics}>
                  <td className={s.tdStatistics}>
                    <span
                      style={{ backgroundColor: item.color }}
                      className={s.spanStatistic}
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
            <tfoot>
              <tr className={s.tfootStatistics}>
                <td className={s.tdfStatistics}>
                  {isIncome ? "Expenses:" : "Income"}
                </td>
                <td
                  className={s.tdfStatistics}
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
