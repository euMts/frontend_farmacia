import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MainSales from "../dashboardSection/MainSalesElements";

const PanoramaChart = ({ data }) => {
  // console.log(data);
  // Extract all unique keys from the JSON data
  const allKeys = new Set();

  const allMonths = [];

  Object.values(data).forEach((element) => { // para cada mes
    // console.log(element)
    allMonths.push(element)
  });

  Object.values(data).forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (key !== "month") {
        allKeys.add(key);
      }
    });
  });

  const allKeysArray = Array.from(allKeys);

  // console.log(allKeys);
  console.table(allMonths);
  return (
    <div
      style={{ display: "flex", marginTop: "5px", justifyContent: "center" }}
    >
      <BarChart
        width={850}
        height={320}
        data={Object.values(data)} // Use Object.values(data) here
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {allKeysArray.map((key, index) => (
          <Bar
            key={index}
            dataKey={key}
            fill={`#${(((1 << 24) * Math.random()) | 0).toString(16)}`}
          />
        ))}
      </BarChart>
    </div>
  );
};

export default PanoramaChart;
