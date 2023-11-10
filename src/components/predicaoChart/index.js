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
import { colorPalette } from "../../assets/colors";

const PredicaoChart = ({ data }) => {
  const dataKeys = Object.keys(data[0]).filter((key) => key !== "name");
  // console.log(dataKeys);
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
        {dataKeys.map((key, index) => (
          <Line
            key={index}
            type="bump"
            dataKey={key}
            stroke={colorPalette[index % colorPalette.length]}
            strokeWidth={2}
            strokeDasharray="1 0"
          />
        ))}
        <Line
          type="monotone"
          dataKey="Previsão"
          stroke="#006600"
          strokeDasharray="5 5"
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
};

export default PredicaoChart;
