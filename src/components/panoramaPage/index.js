import React, { useEffect, useState } from "react";
import { COLORS } from "../../assets/colors";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Tabs,
  Tab,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  FilterLinePanorama,
  FilterLinePanoramaInside,
  FilterLinePanoramaLeft,
  FilterLinePanoramaRight,
} from "./panoramaPageElements";
import Iconify from "../iconify/Iconify";
import PanoramaChart from "../panoramaChart/panoramaChart";
import CustomTabPanel from "../customTabPanel/customTabPanelElement";
import api from "../../connection/api";
import ExportButton from "../exportButton";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const dataFernando = [
  {
    ano: 2018,
    mes: 'Janeiro',
    produto1: { valor: 2000, id: 1, nome: 'Fulano 1' },
    produto2: { valor: 3250, id: 2, nome: 'Beltrano 1' },
    produto3: { valor: 3000, id: 3, nome: 'Sicrano 1' },
    produto4: { valor: 4000, id: 4, nome: 'Sicrano 2' },
    produto5: { valor: 1500, id: 5, nome: 'Beltrano 3' }
  },
  {
    ano: 2018,
    mes: 'Fevereiro',
    produto1: { valor: 4500, id: 6, nome: 'Fulano 2' },
    produto2: { valor: 2750, id: 7, nome: 'Beltrano 2' },
    produto3: { valor: 3000, id: 4, nome: 'Sicrano 2' },
    produto4: { valor: 4000, id: 1, nome: 'Fulano 1' },
    produto5: { valor: 3750, id: 8, nome: 'Sicrano 3' }
  }
];

const PanoramaPage = () => {
  const [selectedOptionsMonth, setSelectedOptionsMonth] = useState([]);
  const [selectedOptionsYear, setSelectedOptionsYear] = useState([]);
  const [value, setValue] = useState(0);
  const [data, setData] = useState();
  const [tabLabels, setTabLabels] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterMonth = (event, newValue) => {
    if (newValue.length <= 5) {
      setSelectedOptionsMonth(newValue);
    }
  };

  const handleFilterYear = (event, newValue) => {
    if (newValue.length <= 5) {
      setSelectedOptionsYear(newValue);
    }
  };

  const searchApi = async (selectedOptionsMonth, selectedOptionsYear) => {
    const requestData = {
      months: selectedOptionsMonth,
      years: selectedOptionsYear,
    };
    setErrorMessage();
    if (selectedOptionsMonth.length >= 1 && selectedOptionsYear.length >= 1) {
      try {
        setIsLoading(true);
        const response = await api.post("/find/panorama", requestData);
        if (response.status === 422) {
          // alert("Usuário ou senha incorretos")
        } else {
          setIsLoading(false);
          setData(response.data.data);
          // setData(dataFernando);
        }
      } catch (error) {
        alert("Erro inesperado");
        setData(null);
      }
    } else {
      setData(null);
      setErrorMessage("Preencha os filtros.");
    }
  };

  const handleSearch = () => {
    searchApi(selectedOptionsMonth, selectedOptionsYear);
  };

  const handleClear = () => {
    setData(null);
    setSelectedOptionsMonth([]);
    setSelectedOptionsYear([]);
    setErrorMessage();
  };

  useEffect(() => {
    if (data) {
      const uniqueYears = new Set(data.map((item) => item.ano));
      const tabLabels =
        data.length > 0 ? new Set(data.map((item) => item.ano)) : [];
      setTabLabels(Array.from(tabLabels));
    }
  }, [data]);

  const handleExport = () => {
    // console.log("export info");
    // console.log(JSON.stringify(data[0]));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const newData = {};

  const monthOptions = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const yearOptions = ["2017", "2018", "2019", "2020", "2021", "2022"];

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
              Panorama
            </Typography>
            <Typography fontSize={16} marginBottom={3}>
              Procurar pelo produto mais vendido em:
            </Typography>
            <FilterLinePanorama>
              <FilterLinePanoramaLeft>
                <Autocomplete
                  value={selectedOptionsMonth}
                  multiple
                  limitTags={1}
                  disableCloseOnSelect
                  style={{
                    minWidth: 180,
                    maxWidth: "350px",
                    marginRight: "15px",
                  }}
                  id="select-mes-id"
                  options={monthOptions}
                  onChange={handleFilterMonth}
                  // disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 0 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Mês" placeholder="" />
                  )}
                />
                <Autocomplete
                  value={selectedOptionsYear}
                  multiple
                  limitTags={1}
                  disableCloseOnSelect
                  style={{
                    minWidth: 180,
                    maxWidth: "350px",
                    marginRight: "15px",
                  }}
                  id="select-ano-id"
                  options={yearOptions}
                  onChange={handleFilterYear}
                  // disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 0 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Ano" placeholder="" />
                  )}
                />
                <Button
                  onClick={handleClear}
                  variant={"outlined"}
                  style={{ height: "56px" }}
                >
                  Limpar Filtros
                </Button>
              </FilterLinePanoramaLeft>
              <FilterLinePanoramaRight>
                <Button
                  style={{ height: "56px", marginRight: "15px", width: "90px" }}
                  variant="contained"
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
                <ExportButton
                  isDisabled={data ? false : true}
                  jsonData={data}
                  style={{ height: "56px" }}
                  variant="contained"
                >
                  Exportar
                </ExportButton>
              </FilterLinePanoramaRight>
            </FilterLinePanorama>
            {/* {true ? ( */}
            {data && tabLabels ? (
              <>
                <Box
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  style={{ marginTop: "10px" }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs"
                  >
                    {/* <Tab label="2017" {...a11yProps(0)} />
                    <Tab label="2018" {...a11yProps(1)} /> */}
                    {tabLabels.map((label, index) => (
                      <Tab key={index} label={label} {...a11yProps(index)} />
                    ))}
                  </Tabs>
                </Box>
                {tabLabels.map((year, index) => (
                  <CustomTabPanel key={year} value={value} index={index}>
                    <PanoramaChart
                      data={data.filter((item) => item.ano === year)}
                    />
                  </CustomTabPanel>
                ))}
              </>
            ) : (
              <h4 style={{ marginTop: "20px" }}>
                Selecione um período e inicie a busca
              </h4>
            )}{" "}
            {errorMessage ? (
              <h4 style={{ marginTop: "20px", color: "red" }}>
                {errorMessage}
              </h4>
            ) : (
              <></>
            )}
            {isLoading ? (
              <Box
                sx={{
                  // display: "flex",
                  marginLeft: "500px",
                  marginTop: "150px",
                  position: "fixed",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <></>
            )}
          </Container>
        </Box>
      </div>
    </>
  );
};

export default PanoramaPage;
