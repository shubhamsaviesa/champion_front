import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Walmart",
    Unpublished: 4000,
    Failed: 2400,
    Active: 2400
  },
  {
    name: "eBay",
    Unpublished: 3000,
    Failed: 1398,
    Active: 2210
  },
  {
    name: "Amaz",
    Unpublished: 2000,
    Failed: 800,
    Active: 2210
   
  },
  {
    name: "Newegg",
    Unpublished: 2000,
    Failed: 800,
    Active: 2210
   
  },
  {
    name: "Sears",
    Unpublished: 2000,
    Failed: 800,
    Active: 2210
   
  },
  {
    name: "Wish",
    Unpublished: 2000,
    Failed: 800,
    Active: 2210
   
  }
];

export default function App() {
  return (
    <ResponsiveContainer>
    <BarChart
      width={900}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5
      }}
      style={{fontSize:"10px"}}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name"/>
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Active" fill="#29DA90"   radius={[10, 10, 0,0]}/>
      <Bar dataKey="Unpublished" fill="#3D6EBD" radius={[10, 10, 0,0]} />
      <Bar dataKey="Failed" fill="#EB0101" radius={[10, 10, 0,0]} />
    </BarChart>
    </ResponsiveContainer>
  );
}
