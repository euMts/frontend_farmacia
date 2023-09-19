import React from "react";
import { useRef, useState } from "react";
import { filter } from "lodash";
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
  Tooltip,
  TextField,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import Label from "../label";
import Iconify from "../iconify/Iconify";
import Scrollbar from "../scrollbar";
import { UserListHead } from "./user";
import { COLORS } from "../../assets/colors";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import ExpandableTableRow from "./user/expandableTableRow";
import CustomTabPanel from "../customTabPanel/customTabPanelElement";
import TableVendas from "./tableVendas";
import TableEstoque from "./tableEstoque";
import api from "../../connection/api";

dayjs.locale("pt-br");

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function VendasestoquePage() {
  const [value, setValue] = useState(0);
  const [vendaMenuOpen, setVendaMenuOpen] = useState(null);
  const [estoqueMenuOpen, setEstoqueMenuOpen] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setAlertMessage("");
    setAlertSeverity("success");
  };

  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    // console.log("fileObj is", fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    // console.log(event.target.files);

    // 👇️ can still access file object here
    // console.log(fileObj);
    // console.log(fileObj.name);

    if (event.target.id === "receberVenda") {
      const vendaFormData = new FormData();
      vendaFormData.append("file", fileObj);

      setIsLoading(true);

      try {
        api
          .post("/file/csv/venda", vendaFormData)
          .then((response) => {
            console.log(response.status);
            if (response.status !== 200) {
              setAlertSeverity("error");
              setAlertMessage("Erro interno");
              setIsAlertOpen(true);
            } else if (response.status === 200) {
              // setData(response.data.data);
              setAlertSeverity("success");
              setAlertMessage("Arquivo recebido! Reinicie a página.");
              setIsAlertOpen(true);
            }
            setIsLoading(false); // Move o setIsLoading(false) para dentro do bloco .then()
          })
          .catch((error) => {
            setAlertSeverity("error");
            setAlertMessage("Erro interno");
            setIsAlertOpen(true);
            setIsLoading(false); // Também pode ser colocado dentro do bloco .catch()
          });
      } catch (error) {
        setAlertSeverity("error");
        setAlertMessage("Erro interno");
        setIsAlertOpen(true);
        setIsLoading(false); // Também pode ser colocado dentro do bloco catch
      }
    } else if (event.target.id === "receberEstoque") {
      const estoqueFormData = new FormData();
      estoqueFormData.append("file", fileObj);

      setIsLoading(true);

      try {
        api
          .post("/file/csv/estoque", estoqueFormData)
          .then((response) => {
            console.log(response.status);
            if (response.status !== 200) {
              setAlertSeverity("error");
              setAlertMessage("Erro interno");
              setIsAlertOpen(true);
            } else if (response.status === 200) {
              setAlertSeverity("success");
              setAlertMessage("Arquivo recebido! Reinicie a página.");
              setIsAlertOpen(true);
            }
            setIsLoading(false); // Parar de exibir o indicador de carregamento
          })
          .catch((error) => {
            // alert("Erro inesperado");
            setAlertSeverity("error");
            setAlertMessage("Erro interno");
            setIsAlertOpen(true);
            setIsLoading(false); // Parar de exibir o indicador de carregamento em caso de erro
          });
      } catch (error) {
        // alert("Erro inesperado");
        setAlertSeverity("error");
        setAlertMessage("Erro interno");
        setIsAlertOpen(true);
        setIsLoading(false); // Parar de exibir o indicador de carregamento em caso de erro
      }
    }
  };

  const handleOpenVendaMenu = (event) => {
    setVendaMenuOpen(event.currentTarget);
  };

  const handleCloseVendaMenu = () => {
    setVendaMenuOpen(null);
  };

  const handleOpenEstoqueMenu = (event) => {
    setEstoqueMenuOpen(event.currentTarget);
  };

  const handleCloseEstoqueMenu = () => {
    setEstoqueMenuOpen(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={10000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
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
              Vendas / Estoque
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs"
              >
                <Tab label="Vendas" {...a11yProps(0)} />
                <Tab label="Estoque" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
              >
                <Stack>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontWeight: "bold" }}
                  >
                    Vendas
                  </Typography>
                  <Typography fontSize={16}>
                    Identificar informações referentes à venda de produtos.
                  </Typography>
                </Stack>
                <div
                  onClick={handleOpenVendaMenu}
                  style={{ padding: "0 0 0 10px" }}
                >
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    Adicionar
                  </Button>
                </div>
              </Stack>

              <Card>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "40px",
                      marginLeft: "500px",
                      marginBottom: "150px",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <TableVendas />
                )}
              </Card>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
              >
                <Stack>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontWeight: "bold" }}
                  >
                    Estoque
                  </Typography>
                  <Typography fontSize={16}>
                    Identificar informações referentes ao estoque.
                  </Typography>
                </Stack>
                <div
                  onClick={handleOpenEstoqueMenu}
                  style={{ padding: "0 0 0 10px" }}
                >
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    // style={{margin: "20px"}}
                  >
                    Adicionar
                  </Button>
                </div>
              </Stack>

              <Card>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "40px",
                      marginLeft: "500px",
                      marginBottom: "150px",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <TableEstoque />
                )}
              </Card>
            </CustomTabPanel>
          </Container>
        </Box>
      </div>
      <Popover
        open={Boolean(vendaMenuOpen)}
        anchorEl={vendaMenuOpen}
        onClose={handleCloseVendaMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleClick}>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            id="receberVenda"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileChange}
          />
          <UploadFileIcon style={{ marginRight: "4px" }} />
          Arquivo CSV
        </MenuItem>

        {/* <MenuItem onClick={() => console.log("manual venda")}>
          <AddIcon style={{ marginRight: "4px" }} />
          Manualmente
        </MenuItem> */}
      </Popover>

      <Popover
        open={Boolean(estoqueMenuOpen)}
        anchorEl={estoqueMenuOpen}
        onClose={handleCloseEstoqueMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleClick}>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            id="receberEstoque"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileChange}
          />
          <UploadFileIcon style={{ marginRight: "4px" }} />
          Arquivo CSV
        </MenuItem>

        {/* <MenuItem onClick={() => console.log("manual estoque")}>
          <AddIcon style={{ marginRight: "4px" }} />
          Manualmente
        </MenuItem> */}
      </Popover>
    </>
  );
}
