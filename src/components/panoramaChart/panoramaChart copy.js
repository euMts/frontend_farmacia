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

const data = [
  {
    name: "Janeiro",
    matheus: 4000,
    amanda: 2400,
    joao: 2400,
    mosconi: 2400,
    luis: 6400,
  },
  {
    name: "Fevereiro",
    carlos: 4000,
    teste: 2400,
    matheus: 6400,
    valdir: 2400,
    isabela: 7400,
  },
  // {
  //   name: "Março",
  //   testando: 4000,
  //   matheus: 2400,
  //   bomestudo: 2400,
  //   seila: 1400,
  //   produto_25: 2400,
  // },
  // {
  //   name: "Abril",
  //   atendendo: 4000,
  //   sorteio: 2400,
  //   matheus: 5400,
  //   gustavo: 2400,
  //   seila: 3400,
  // },
  // {
  //   name: "Maio",
  //   matheus: 4000,
  //   mosconi: 2400,
  //   carlos: 2400,
  //   testando: 2400,
  //   seila: 6400,
  // },
  // {
  //   name: "Junho",
  //   nfl: 4000,
  //   netflix: 2400,
  //   nike: 2400,
  //   nasa: 2400,
  //   netshoes: 2400,
  // },
  // {
  //   name: "Julho",
  //   abc: 4000,
  //   sss: 2400,
  //   zuado: 1400,
  //   nconheco: 2400,
  //   teste: 2400,
  // },
];

const PanoramaChart = () => {
  // Extract all unique keys from the JSON data
  const allKeys = data.reduce((keys, entry) => {
    Object.keys(entry).forEach((key) => {
      if (key !== "name" && !keys.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }, []);

  // console.log(allKeys);
  return (
    <div
      style={{ display: "flex", marginTop: "5px", justifyContent: "center" }}
    >
      <BarChart
        width={850}
        height={320}
        data={data}
        margin={{
          top: 5,
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
        {allKeys.map((key, index) => (
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
