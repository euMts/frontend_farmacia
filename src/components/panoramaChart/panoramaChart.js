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
import CustomTooltip from "./CustomTooltip";
import { colorPalette } from "../../assets/colors";

const PanoramaChart = ({ data }) => {
  const allKeys = new Set();
  const allMonths = [];
  const allProducts = new Set();
  const allObj = [];

  Object.values(data).forEach((element) => {
    // para cada mes
    // console.log(element)
    allMonths.push(element);
  });

  Object.values(data).forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (key !== "month" && key !== "original") {
        allKeys.add(key);
        allObj.push(obj);
      }
      if (key == "original") {
        Object.keys(obj.original).forEach((product) => {
          if (!allProducts.has(product) && product !== "month") {
            allProducts.add(product);
          }
        });
      }
    });
  });

  const allKeysArray = Array.from(allKeys);
  const allProductsArray = Array.from(allProducts);

  // console.log(allObj);
  // Array.from(allProducts).map((key, index) => {
  //   console.log(key, index);
  // });

  // allKeysArray.map((key, index) => (console.log(index)))

  // console.log(allMonths);
  // console.table(allMonths);
  return (
    <div
      style={{ display: "flex", marginTop: "5px", justifyContent: "center" }}
    >
      <BarChart
        width={850}
        height={320}
        data={(data)} // Use Object.values(data) here
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowReorder />
        <Tooltip
          content={
            <CustomTooltip
              allProductsArray={allProductsArray}
              colorPalette={colorPalette}
            />
          }
        />
        {/* <Legend /> */}
        {/* {allObj.map((key, index) => {
          if(key[index])
          console.log(key[index].value, key[index].key);
          if(key[index])
          return ( */}
            <Bar
              // key={index}
              dataKey='value'
              fill={"colorPalette[index % colorPalette.lenght]"}
            >
              {/* {allObj.map((key2, index2) => {
                return (
                  <Cell fill={"colorPalette[index % colorPalette.lenght]"} />
                );
              })} */}
            </Bar>
          {/* );
        })} */}
      </BarChart>
    </div>
  );
};

export default PanoramaChart;
