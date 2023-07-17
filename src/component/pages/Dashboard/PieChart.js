import React from "react";
import { PieChart, Pie, Cell,Tooltip,ResponsiveContainer } from "recharts";

const data = [
  { name: "Sears", value: 500 },
  { name: "Amazon", value: 100 },
  { name: "Walmart", value: 300 },
  { name: "eBay", value: 200 },
  { name: "Wish", value: 200 },
  { name: "Newegg", value: 150 },
 
];
const COLORS = ["#980000","#00FF00", "#FF0000", "#FFFF00", "#FF9900","#4A86E8"];

export default function PieChartHome() {
  return (
    <ResponsiveContainer >
      <PieChart>
         <Pie
        data={data}
        innerRadius="45%"
        // outerRadius={110}
        paddingAngle={0}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
  );
}
<ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} fill="#8884d8" label />
        </PieChart>
      </ResponsiveContainer>