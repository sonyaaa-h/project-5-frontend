import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function PieChartWithPaddingAngle({ data, total }) {
  return (
    <PieChart width={264} height={264}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={95}
        outerRadius={132}
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
        fontSize={18}
        fontWeight={700}
      >
        ₴ {total}
      </text>
    </PieChart>
  );
}
