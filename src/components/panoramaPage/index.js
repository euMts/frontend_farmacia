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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PanoramaPage = () => {
  const [selectedOptionsMonth, setSelectedOptionsMonth] = useState([]);
  const [selectedOptionsYear, setSelectedOptionsYear] = useState([]);
  const [value, setValue] = useState(0);
  const [data, setData] = useState();
  const [tabLabels, setTabLabels] = useState();

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

  const handleSearch = () => {
    console.log(selectedOptionsMonth);
    console.log(selectedOptionsYear);
    setData([
      {
        2018: {
          janeiro: {
            month: "janeiro",
            matheus: 4000,
            amanda: 2400,
            joao: 2400,
            mosconi: 2400,
            luis: 6400,
          },
          fevereiro: {
            month: "fevereiro",
            carlos: 4000,
            teste: 2400,
            matheus: 6400,
            valdir: 2400,
            isabela: 7400,
          },
          março: {
            month: "março",
            a: 4000,
            b: 2400,
            c: 6400,
            d: 2400,
            e: 7400,
          },
        },
        2019: {
          janeiro: {
            month: "janeiro",
            matheus: 4000,
            amanda: 2400,
            joao: 2400,
            mosconi: 2400,
            luis: 6400,
          },
          fevereiro: {
            month: "fevereiro",
            carlos: 4000,
            teste: 2400,
            matheus: 6400,
            valdir: 2400,
            isabela: 7400,
          },
        },
        2020: {
          janeiro: {
            month: "janeiro",
            matheus: 4000,
            amanda: 2400,
            joao: 2400,
            mosconi: 2400,
            luis: 6400,
          },
          fevereiro: {
            month: "fevereiro",
            a: 4000,
            b: 2400,
            c: 2400,
            d: 2400,
            e: 6400,
          },
        },
      },
    ]);
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      const tabLabels =
        data.length > 0
          ? Object.keys(data[0]).filter((key) => key !== "month")
          : [];
      setTabLabels(tabLabels);
    }
  }, [data]);

  const handleExport = () => {
    console.log("export info");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          height: "600px",
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
                  style={{ minWidth: 180, maxWidth: "350px" }}
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
              </FilterLinePanoramaLeft>
              <FilterLinePanoramaRight>
                <Button
                  style={{ height: "56px", marginRight: "15px", width: "90px" }}
                  variant="contained"
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
                <Button
                  style={{ height: "56px" }}
                  variant="contained"
                  onClick={handleExport}
                >
                  Exportar
                </Button>
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
                {/* <CustomTabPanel value={value} index={0}>
                  <PanoramaChart data={data[0]["2018"]} />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                  <PanoramaChart data={data[0]["2019"]} />
                </CustomTabPanel> */}
                {tabLabels.map((label, index) => (
                  <CustomTabPanel key={index} value={value} index={index}>
                    <PanoramaChart data={data[0][label]} />
                  </CustomTabPanel>
                ))}
              </>
            ) : (
              <h4 style={{ marginTop: "20px" }}>
                Selecione um período e inicie a busca
              </h4>
            )}{" "}
          </Container>
        </Box>
      </div>
    </>
  );
};

export default PanoramaPage;
