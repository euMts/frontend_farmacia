import React, { useState } from "react";
import { COLORS } from "../../assets/colors";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const PanoramaPage = () => {
  const [selectedOptionsMonth, setSelectedOptionsMonth] = useState([]);
  const [selectedOptionsYear, setSelectedOptionsYear] = useState([]);

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
  };

  const handleExport = () => {
    console.log("export info");
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
            <PanoramaChart />
          </Container>
        </Box>
      </div>
    </>
  );
};

export default PanoramaPage;
