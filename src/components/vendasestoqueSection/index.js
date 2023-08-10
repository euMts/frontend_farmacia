import React from "react";
import { useEffect, useState } from "react";
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
              variant="h2"
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
                    variant="h5"
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
                <TableVendas />
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
                    variant="h5"
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
                <TableEstoque />
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
        <MenuItem onClick={() => console.log("csv venda")}>
          <UploadFileIcon style={{ marginRight: "4px" }} />
          Arquivo CSV
        </MenuItem>

        <MenuItem onClick={() => console.log("manual venda")}>
          <AddIcon style={{ marginRight: "4px" }} />
          Manualmente
        </MenuItem>
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
        <MenuItem onClick={() => console.log("csv estoque")}>
          <UploadFileIcon style={{ marginRight: "4px" }} />
          Arquivo CSV
        </MenuItem>

        <MenuItem onClick={() => console.log("manual estoque")}>
          <AddIcon style={{ marginRight: "4px" }} />
          Manualmente
        </MenuItem>
      </Popover>
    </>
  );
}
