import React, { useState } from "react";
import { COLORS } from "../../assets/colors";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  FilterLinePredicao,
  FilterLinePredicaoLeft,
  FilterLinePredicaoRight,
} from "./predicaoPageElements";

const productOptions = [
  "produto 1",
  "produto 2",
  "produto 3",
  "produto 4",
  "produto 5",
  "produto 6",
  "produto 7",
  "produto 8",
  "produto 9",
  "produto 10",
  "produto 11",
  "produto 12",
];

const PredicaoPage = () => {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleStart = () => {
    console.log(value);
  };

  const handleExport = () => {
    console.log("export info");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          padding: "35px 0 0 0",
          backgroundColor: COLORS.white,
          // overflow: "auto",
          height: "900px",
        }}
      >
        <Box style={{ width: "100%" }}>
          <Container>
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Predição
            </Typography>
            <Typography fontSize={16} marginBottom={3}>
              Estimar vendas do produto:
            </Typography>
            <FilterLinePredicao>
              <FilterLinePredicaoLeft>
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="id-produto-predicao"
                  options={productOptions}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Produto" />
                  )}
                />
              </FilterLinePredicaoLeft>
              <FilterLinePredicaoRight>
                <Button
                  style={{ height: "56px", marginRight: "15px", width: "90px" }}
                  variant="contained"
                  onClick={handleStart}
                >
                  Iniciar
                </Button>
                <Button
                  style={{ height: "56px" }}
                  variant="contained"
                  onClick={handleExport}
                >
                  Exportar
                </Button>
              </FilterLinePredicaoRight>
            </FilterLinePredicao>
          </Container>
        </Box>
      </div>
    </>
  );
};

export default PredicaoPage;
