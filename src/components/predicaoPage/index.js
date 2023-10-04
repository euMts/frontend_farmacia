import React, { useEffect, useState } from "react";
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
import PredicaoChart from "../predicaoChart";
import api from "../../connection/api";

const PredicaoPage = () => {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [productOptions, setProductOptions] = useState([""]);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const firstSearchApi = async () => {
    setErrorMessage("");
    try {
      const response = await api.get("/find/products");
      if (response.status === 422) {
        // alert("Usuário ou senha incorretos")
      } else {
        setProductOptions(response.data.uniqueProducts);
      }
      // console.log(productOptions);
    } catch (error) {
      alert("Erro inesperado");
      setProductOptions("");
      setErrorMessage();
    }
  };

  useEffect(() => {
    firstSearchApi();
  }, []);

  const handleClear = () => {
    setData([]);
    setValue();
  };

  const searchApi = async (inputValue) => {
    const requestData = {
      product: inputValue,
    };
    setErrorMessage();
    // console.log(inputValue, "samns")
    if (inputValue.length >= 1) {
      try {
        setIsLoading(true);
        const response = await api.post("/find/predicao", requestData);
        if (response.status === 422) {
          // alert("Usuário ou senha incorretos")
        } else {
          setIsLoading(false);
          setData(response.data.data);
        }
      } catch (error) {
        alert("Erro inesperado");
        setData([]);
      }
    } else {
      setData([]);
      setErrorMessage("Preencha os filtros.");
    }
  };

  const handleStart = () => {
    searchApi(inputValue);
    // console.log(value);
    // console.log(data);
    // setData([
    //   {
    //     "name": "Julho",
    //     "Vendas de 2017": 2780,
    //     "Vendas de 2018": 3908
    //   },
    //   {
    //     "name": "Agosto",
    //     "Vendas de 2017": 1890,
    //     "Vendas de 2018": 4800
    //   },
    //   {
    //     "name": "Setembro",
    //     "Vendas de 2017": 2390,
    //     "Vendas de 2018": 3800
    //   },
    //   {
    //     "name": "Outubro",
    //     "Vendas de 2017": 3490,
    //     "Vendas de 2018": 4300,
    //     "Previsão": 3490
    //   },
    //   {
    //     "name": "Novembro",
    //     "Previsão": 9490
    //   }
    // ]
    // );
  };

  const handleExport = () => {

    const downloadCsv = (csvData) => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;
      const fileName = `predicao-${formattedDate}.csv`;
  
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileName; // The filename for the downloaded CSV
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    };

    const dataToCSV = (data) => {
      let csv = "";

      for (let item of data) {
        for (let key in item) {
          // Ignorar a chave "name" e a chave "Previsão" do penúltimo item
          if (
            key === "name" ||
            (key === "Previsão" && item === data[data.length - 2])
          )
            continue;

          let year = null;
          let saleValue = null;
          let predictionValue = null;

          if (key.startsWith("Vendas de ")) {
            year = key.split(" ")[2];
            saleValue = item[key];
          } else if (key === "Previsão") {
            year = new Date().getFullYear(); // assumindo que a previsão é para o ano atual
            predictionValue = item[key];
          }

          csv += `${year || "null"};${item.name};${inputValue};${
            saleValue || "null"
          };${predictionValue || "null"}\n`;
        }
      }

      const dataArray = csv.split('\n').map((row) => {
        const [Ano, mes, produto, venda, previsao] = row.split(';');
        return { Ano, mes, produto, venda, previsao };
      });
    
      // Remove any empty objects from the array
      const filteredArray = dataArray.filter((item) => !!item.Ano);
    
      // Sort the array by the "Ano" property
      filteredArray.sort((a, b) => {
        const yearA = parseInt(a.Ano);
        const yearB = parseInt(b.Ano);
        return yearA - yearB;
      });
    
      // Generate the sorted CSV
      let orderedCsv = "Ano;Mes;Produto;Venda;Predicao\n";
      filteredArray.forEach((item) => {
        orderedCsv += `${item.Ano};${item.mes};${item.produto};${item.venda};${item.previsao}\n`;
      });
    
      return orderedCsv;
    };



    downloadCsv(dataToCSV(data))
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
          height: "100vh",
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
                  style={{ marginRight: "15px" }}
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
                <Button
                  onClick={handleClear}
                  variant={"outlined"}
                  style={{ height: "56px" }}
                >
                  Limpar Filtros
                </Button>
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
                  disabled={data.length > 0 ? false : true}
                  style={{ height: "56px" }}
                  variant="contained"
                  onClick={handleExport}
                >
                  Exportar
                </Button>
              </FilterLinePredicaoRight>
            </FilterLinePredicao>
            {data.length > 0 ? (
              <PredicaoChart data={data} />
            ) : (
              <h4 style={{ marginTop: "20px" }}>
                Selecione um produto e inicie a predição
              </h4>
            )}
            {errorMessage ? (
              <h4 style={{ marginTop: "20px", color: "red" }}>
                {errorMessage}
              </h4>
            ) : (
              <></>
            )}
          </Container>
        </Box>
      </div>
    </>
  );
};

export default PredicaoPage;
