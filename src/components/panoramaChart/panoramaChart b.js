import React from "react";
import {
  BarChart,
  Bar,
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
    Produto1: {
      valor: 400,
      nome: "alprazomal",
      cor: "red",
    },
    Produto2: {
      valor: 200,
      nome: "dramin",
      cor: "blue",
    },
  },
  {
    name: "Fevereiro",
    Produto1: {
      valor: 100,
      nome: "dorflex",
      cor: "purple",
    },
    Produto2: {
      valor: 300,
      nome: "dipirona",
      cor: "orange",
    },
  },
  // Adicione mais dados conforme necessário
];

function getCorByNome(monthData, productName) {
  for (const key in monthData) {
    if (monthData.hasOwnProperty(key) && monthData[key].nome === productName) {
      return monthData[key].cor;
    }
  }
  return null; // Return null if not found
}

const PanoramaChart = () => {
  // Extrair todas as chaves de produtos para criar as barras do gráfico
  const productKeys = Object.keys(data[0]).filter((key) => key !== "name");

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={Object.values(data)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend 
           payload={
            productKeys.map(
              (item, index) => ({
                id: item.name,
                type: "square",
                value: `${item.name} (${item.value}%)`,
                color: item.cor
              })
            )
          }
          />
          {productKeys.map((productKey, index) => (
            <Bar
              key={index}
              dataKey={`${productKey}.valor`}
              name={index}
              fill={data[0][productKey].cor}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PanoramaChart;
