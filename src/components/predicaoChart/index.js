import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Julho",
    "Vendas de 2017": 2780,
    "Vendas de 2018": 3908,
  },
  {
    name: "Agosto",
    "Vendas de 2017": 1890,
    "Vendas de 2018": 4800,
  },
  {
    name: "Setembro",
    "Vendas de 2017": 2390,
    "Vendas de 2018": 3800,
  },
  {
    name: "Outubro",
    "Vendas de 2017": 3490,
    "Vendas de 2018": 4300,
    Previsão: 3490,
  },
  {
    name: "Novembro",
    Previsão: 9490,
  },
];

const PredicaoChart = () => {
  return (
    <div
      style={{ display: "flex", marginTop: "30px", justifyContent: "center" }}
    >
      <LineChart
        width={850}
        height={320}
        data={data}
        margin={{
          top: 25,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Vendas de 2017"
          stroke="blue"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="Vendas de 2018"
          stroke="green"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="Previsão"
          stroke="red"
          strokeDasharray="5 5"
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
};

export default PredicaoChart;
