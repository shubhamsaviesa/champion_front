import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
  
} from "recharts";

const data = [
  {
    Date: "Oct 10",
    Sears: 0,
    Amazon: 0,
    Walmart: 0,
    eBay: 0,
    Wish: 0,
    Newegg:300,
  },
  {

    Date: "Oct 11",
    Sears: 10,
    Amazon: 20,
    Walmart: 30,
    eBay: 40,
    Wish: 50,
    Newegg:300,
 },
  {

    Date: "Oct 12",
    Sears: 30,
    Amazon: 40,
    Walmart: 50,
    eBay: 60,
    Wish: 70,
    Newegg:300,
   },
  {

    Date: "Oct 12",
    Sears: 50,
    Amazon: 60,
    Walmart: 70,
    eBay: 80,
    Wish: 90,
    Newegg:300,
  },
  {

    Date: "Oct 13",
    Sears: 70,
    Amazon: 80,
    Walmart: 90,
    eBay: 100,
    Wish: 120,
    Newegg:300,
   },
  {

    Date: "Oct 14",
    Sears: 100,
    Amazon: 200,
    Walmart: 200,
    eBay: 300,
    Wish: 400,
    Newegg:300,
  },
  {

    Date: "Oct 15",
    Sears: 70,
    Amazon: 80,
    Walmart: 90,
    eBay: 100,
    Wish: 120,
    Newegg:300,
    },
  {

    Date: "Oct 17",
    Sears: 100,
    Amazon: 200,
    Walmart: 200,
    eBay: 300,
    Wish: 400,
    Newegg:300,
  },
  {

    Date: "Oct 18",
    Sears: 500,
    Amazon: 600,
    Walmart: 600,
    eBay: 400,
    Wish: 400,
    Newegg:300,
  },

];

export default function LineChart1() {
  return (
    <ResponsiveContainer>
      <LineChart
        width={1000}
        height={300}
        data={data}
     

      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}

        <Line type="monotone" dataKey="Sears" stroke="#980000" />
        <Line type="monotone" dataKey="Amazon" stroke="#00FF00" />
        <Line type="monotone" dataKey="Walmart" stroke="#FF0000" />
        <Line type="monotone" dataKey="eBay" stroke="#FFFF00" />
        <Line type="monotone" dataKey="Wish" stroke="#FF9900" />
        <Line type="monotone" dataKey="Newegg" stroke="#4A86E8" />

      </LineChart></ResponsiveContainer>
  );
}
