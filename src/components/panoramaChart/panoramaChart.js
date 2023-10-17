import React, { PureComponent, useCallback } from "react";
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
  ComposedChart,
} from "recharts";
import MainSales from "../dashboardSection/MainSalesElements";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import CustomTooltip from "./CustomTooltip";
import { colorPalette } from "../../assets/colors";

// const PanoramaChart = ({ data }) => {
//   const allKeys = new Set();
//   const allMonths = [];
//   const allProducts = new Set();
//   const allObj = [];

//   Object.values(data).forEach((element) => {
//     // para cada mes
//     // console.log(element)
//     allMonths.push(element);
//   });

//   Object.values(data).forEach((obj) => {
//     Object.keys(obj).forEach((key) => {
//       if (key !== "month" && key !== "original") {
//         allKeys.add(key);
//         allObj.push(obj);
//       }
//       if (key == "original") {
//         Object.keys(obj.original).forEach((product) => {
//           if (!allProducts.has(product) && product !== "month") {
//             allProducts.add(product);
//           }
//         });
//       }
//     });
//   });

//   const allKeysArray = Array.from(allKeys);
//   const allProductsArray = Array.from(allProducts);

//   // console.log(allObj);
//   // Array.from(allProducts).map((key, index) => {
//   //   console.log(key, index);
//   // });

//   // allKeysArray.map((key, index) => (console.log(index)))

//   // console.log(allMonths);
//   // console.table(allMonths);
//   return (
//     <div
//       style={{ display: "flex", marginTop: "5px", justifyContent: "center" }}
//     >
//       <BarChart
//         width={850}
//         height={320}
//         data={Object.values(data)} // Use Object.values(data) here
//         margin={{
//           top: 5,
//           right: 0,
//           left: 0,
//           bottom: 0,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis allowReorder />
//         <Tooltip
//           content={
//             <CustomTooltip
//               allProductsArray={allProductsArray}
//               colorPalette={colorPalette}
//             />
//           }
//         />
//         {/* <Legend /> */}
//         {allKeysArray.map((key, index) => {
//           return (
//             <Bar
//               key={index}
//               dataKey={key}
//               fill={"colorPalette[index % colorPalette.lenght]"}
//             >
//               {allProductsArray.map((key2, index2) => {
//                 // console.log(key2)
//                 return (
//                   <Cell fill={"colorPalette[index % colorPalette.lenght]"} />
//                 );
//               })}
//             </Bar>
//           );
//         })}
//       </BarChart>
//     </div>
//   );
// };

// const data = [
//   {
//     ano: 2018,
//     mes: "Janeiro",
//     produto1: { valor: 2000, nome: "Fulano 1" },
//     produto2: { valor: 3250, nome: "Beltrano 1" },
//     produto3: { valor: 3000, nome: "Sicrano 1" },
//     produto4: { valor: 4000, nome: "Sicrano 2" },
//     produto5: { valor: 1500, nome: "Beltrano 3" },
//   },
//   {
//     ano: 2018,
//     mes: "Fevereiro",
//     produto1: { valor: 4500, nome: "Fulano 2" },
//     produto2: { valor: 2750, nome: "Beltrano 2" },
//     produto3: { valor: 3000, nome: "Sicrano 2" },
//     produto4: { valor: 4000, nome: "Fulano 1" },
//     produto5: { valor: 3750, nome: "Sicrano 3" },
//   },
//   {
//     ano: 2018,
//     mes: "Março",
//     produto1: { valor: 4500, nome: "Fulano 1" },
//     produto2: { valor: 2750, nome: "Beltrano 2" },
//     produto3: { valor: 3000, nome: "Sicrano 2" },
//     produto4: { valor: 4000, nome: "Fulano 1" },
//     produto5: { valor: 3750, nome: "Sicrano 3" },
//   },
// ];

// eslint-disable-next-line react/prop-types
function CustomTooltip({ active, payload = [] }) {
  const { payload: firstPayload } = payload[0] || {};
  const { mes } = firstPayload || {};

  if (active && payload.length)
    return (
      <Box
        style={{
          padding: ".75rem 1rem",
          background: "#FFF",
          border: ".0625rem solid #222",
          borderRadius: ".25rem",
        }}
      >
        <Typography variant="subtitle2" mb=".5rem">
          {mes}
        </Typography>

        {payload.map(({ dataKey, payload: internalPayload }) => {
          const [productKey] = dataKey.split(".");
          const product = internalPayload[productKey];

          return (
            <Typography key={product} variant="body2" color={colorPalette[product.id]}>
              {product.nome}: {product.valor}
            </Typography>
          );
        })}
      </Box>
    );

  return null;
}

function PanoramaChart({ data }) {
  const allProductIds = data.reduce((acc, item) => {
    const allProps = Object.entries(item);

    const onlyTheProductIds = allProps
      .filter(([key]) => key.includes('produto'))
      .map(([, { id }]) => id);

    const noDuplicateIds = [...new Set(acc.concat(onlyTheProductIds))];

    return noDuplicateIds;
  }, []);

  const productIdsWithYourColors = allProductIds.reduce((acc, id) => {
    const red = Math.floor(Math.random() * 150);
    const green = Math.floor(Math.random() * 150);
    const blue = Math.floor(Math.random() * 150);

    return { ...acc, [id]: `rgb(${red}, ${green}, ${blue})` };
  }, {});

  const dataWithColors = data.map((item) => {
    const allProps = Object.entries(item);

    const itemsWithColor = allProps.map(([key, value]) =>
      key.includes('produto')
        ? [key, { ...value, fill: productIdsWithYourColors[value.id] }]
        : [key, value]
    );

    return Object.fromEntries(itemsWithColor);
  });

  const generateBar = useCallback(
    (number) => {
      const product = `produto${number}`;

      return (
        <Bar dataKey={`${product}.valor`} barSize={30}>
          {dataWithColors.map(({ [product]: { id } }) => (
            <Cell key={crypto.randomUUID()} fill={colorPalette[id]} />
          ))}
        </Bar>
      );
    },
    [dataWithColors]
  );

  return (
    <Box height="30rem">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart width={1000} height={400} data={dataWithColors}>
          <CartesianGrid stroke="#E5E5E5" />

          <XAxis scale="auto" dataKey="mes" />
          <YAxis />

          <Tooltip content={<CustomTooltip />} />

          {generateBar(1)}
          {generateBar(2)}
          {generateBar(3)}
          {generateBar(4)}
          {generateBar(5)}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PanoramaChart;
