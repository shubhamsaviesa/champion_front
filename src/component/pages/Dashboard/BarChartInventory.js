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
    name: `Out of stock`,
    uv: 590,
    total: 800,
    amt: 1400,
    cnt: 490
  },
  {
    name: `Low inventory`,
    uv: 868,
    total: 967,
    amt: 1506,
    cnt: 590
  },
  {
    name: `Product not synced`,
    uv: 1397,
    total: 1098,
    amt: 989,
    cnt: 350
  }];

export default function BarChartInventory() {
  return (
    <>
      <ResponsiveContainer>
    <ComposedChart
      layout="vertical"
      width={500}
      height={250}
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
      <YAxis tick={{ fontSize: '12px' }} dataKey="name" type="category" scale="band" width={150} minTickGap={10}/>
      <Tooltip />
      <Bar dataKey="total" barSize={50} fill="#646D82" />
    </ComposedChart></ResponsiveContainer>
    </>
  );
}
