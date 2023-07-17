import React from "react";
import { Box,styled } from "@mui/material";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";



const data = [
  {
    name: `16 Pcs Ear Cleaner Wax Removal`,
    uv: 590,
    total: 800,
    amt: 1400,
    cnt: 490
  },
  {
    name: `Holiday Laser light Holiday Laser light`,
    uv: 868,
    total: 967,
    amt: 1506,
    cnt: 590
  },
  {
    name: `5ft Full Body Skelton 5ft Full Body Skelton`,
    uv: 1397,
    total: 1098,
    amt: 989,
    cnt: 350
  },
  {
    name: "5ft Full Body Skelton",
    uv: 1480,
    total: 1200,
    amt: 1228,
    cnt: 480
  },
  {
    name: "5ft full body skelton",
    uv: 1520,
    total: 1108,
    amt: 1100,
    cnt: 460
  }
];

export default function BarChartHorizontal() {
  return (
    <>
      <ResponsiveContainer>
    <ComposedChart
      layout="vertical"
      width={500}
      height={310}
      data={data}
      margin={{
        top: 10,
        right: 20,
        bottom: 20,
        left: 20
      }}
     
    >
      <CartesianGrid horizontal={false} stroke=" " />
      <XAxis hide type="number" />
      <YAxis tick={{ fontSize: '12px' }} dataKey="name" type="category" scale="band" width={150} minTickGap={20}/>
      <Tooltip />
      <Bar dataKey="total" barSize={45} fill="#537EFE" />
    </ComposedChart></ResponsiveContainer>
    </>
  );
}
