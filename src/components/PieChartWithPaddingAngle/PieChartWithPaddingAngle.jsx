import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function PieChartWithPaddingAngle({ data, total }) {
  return (
    <PieChart width={241} height={207}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={100}
        paddingAngle={0}
        startAngle={0}
        endAngle={360}
        dataKey="sum"
        nameKey="category"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.color || "#cccccc"}
            stroke="transparent"
          />
        ))}
      </Pie>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
      >
        ₴ {total}
      </text>
    </PieChart>
  );
}
