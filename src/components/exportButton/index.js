import { Button } from "@mui/material";
import React from "react";

const ExportButton = (jsonData) => {

  const handleDownload = () => {
    // console.log(jsonData.jsonData);
  };

  return (
    <>
      <Button
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
