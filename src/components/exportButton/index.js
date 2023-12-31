import { Button } from "@mui/material";
import React from "react";

const ExportButton = (data) => {
  const getCsv = (data) => {
    let myCsv = "ano;mes;produto;vendas\n";

    // Iterate through the data
    data.forEach((item) => {
      const { ano, mes } = item;
      const meses = Object.keys(item).filter((key) =>
        key.startsWith("produto")
      );

      meses.forEach((produtoKey) => {
        const produto = item[produtoKey];
        myCsv += `${ano};${mes};${produto.nome};${produto.valor}\n`;
      });
    });

    return myCsv;
  };

  const downloadCsv = (csvData) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
    const fileName = `panorama-${formattedDate}.csv`;

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName; 
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleDownload = () => {
    if (data.jsonData != null) {
      const csvData = getCsv(data.jsonData);
      console.table(csvData);
      downloadCsv(csvData);
    }
  };

  return (
    <>
      <Button
        disabled={data.isDisabled}
        style={{ height: "56px" }}
        variant="contained"
        onClick={handleDownload}
      >
        Exportar
      </Button>
    </>
  );
};

export default ExportButton;
