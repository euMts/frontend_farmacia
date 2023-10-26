import {
  Table,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Tooltip,
  TextField,
  Checkbox,
  Popover,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { filter } from "lodash";
import Label from "../label";
import Scrollbar from "../scrollbar";
import { UserListHead } from "./user";
import ExpandableTableRow from "./user/expandableTableRow";
import Iconify from "../iconify/Iconify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditEstoqueModal from "../editEstoqueModal";
import api from "../../connection/api";
import DeleteEstoqueModal from "../deleteEstoqueModal";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TABLE_HEAD = [
  { id: "spacing", label: "", alignDirection: "center" },
  { id: "nome", label: "Nome", alignDirection: "center" },
  { id: "quantidade", label: "Quantidade", alignDirection: "right" },
  {
    id: "unidade_medida",
    label: "Unidade de Medida",
    alignDirection: "center",
  },
  { id: "adicionado_em", label: "Adicionado em", alignDirection: "center" },
];

// const estoqueData = [
//   {
//     id: 0,
//     nome: "Produto 1",
//     quantidade: 3,
//     unidade_medida: "UN",
//     adicionado_em: "27/07/2023",
//   },
//   {
//     id: 1,
//     nome: "Produto 2",
//     quantidade: 3,
//     unidade_medida: "UN",
//     adicionado_em: "27/07/2023",
//   },
//   {
//     id: 2,
//     nome: "Produto 3",
//     quantidade: 6,
//     unidade_medida: "UN",
//     adicionado_em: "21/07/2023",
//   },
//   {
//     id: 3,
//     nome: "Produto 4",
//     quantidade: 5,
//     unidade_medida: "UN",
//     adicionado_em: "22/07/2023",
//   },
//   {
//     id: 4,
//     nome: "Produto 5",
//     quantidade: 3,
//     unidade_medida: "UN",
//     adicionado_em: "24/07/2023",
//   },
//   {
//     id: 5,
//     nome: "Produto 1",
//     quantidade: 2,
//     unidade_medida: "UN",
//     adicionado_em: "21/07/2023",
//   },
// ];

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const filtroOptions = [
  {
    value: "nome",
    label: "Nome",
  },
  {
    value: "quantidade",
    label: "Quantidade",
  },
  {
    value: "unidade_medida",
    label: "Unidade de Medida",
  },
  {
    value: "created_at",
    label: "Adicionado em",
  },
];

export default function TableEstoque() {
  const [newFeateredUsers, setNewFeateredUsers] = useState();
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterType, setFilterType] = useState("");
  const [filterOperation, setFilterOperation] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [idProdutoAtual, setIdProdutoAtual] = useState(null);
  const [nomeProdutoAtual, setNomeProdutoAtual] = useState("");
  const [adicionadoEmAtual, setAdicionadoEmAtual] = useState("");
  const [quantidadeProdutoAtual, setQuantidadeProdutoAtual] = useState("");
  const [unidadeMedidaAtual, setUnidadeMedidaAtual] = useState("");
  const [estoqueData, setEstoqueData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [filterProduct, setFilterProduct] = useState("");
  const [filter, setFilter] = useState("");
  const [filterOrder, setFilterOrder] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const handleOpenMenu = (event) => {
    const idProduto = event.currentTarget.getAttribute("idProduto");
    const nomeProduto = event.currentTarget.getAttribute("nomeProduto");
    const adicionadoEm = event.currentTarget.getAttribute("adicionadoEm");
    const quantidadeProduto = event.currentTarget.getAttribute("quantidade");
    const unidadeMedida = event.currentTarget.getAttribute("unidade_medida");
    setOpen(event.currentTarget);
    setIdProdutoAtual(idProduto);
    setNomeProdutoAtual(nomeProduto);
    setAdicionadoEmAtual(adicionadoEm);
    setQuantidadeProdutoAtual(quantidadeProduto);
    setUnidadeMedidaAtual(unidadeMedida);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/find/estoque/pagination?page=${page + 1}&per_page=${rowsPerPage}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { estoque, pagination } = response.data;

        setEstoqueData(estoque.estoque);
        setTotalItems(pagination.total_items);
        setTotalPages(pagination.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = async (event, newPage) => {
    const apiEndpoint = `/find/estoque/pagination?page=${
      newPage + 1
    }&per_page=${rowsPerPage}&product_name=${filterProduct}&filter_column=${filter}&order=${filterOrder}`;

    try {
      const response = await api.get(apiEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { estoque, pagination } = response.data;

      setEstoqueData(estoque.estoque);
      setTotalItems(pagination.total_items);
      setTotalPages(pagination.total_pages);
      setPage(newPage); // Update the page state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    // setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    const apiEndpoint = `/find/estoque/pagination?page=${1}&per_page=${
      event.target.value
    }&product_name=${filterProduct}&filter_column=${filter}&order=${filterOrder}`;

    const response = api
      .get(apiEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setEstoqueData(data.data.estoque.estoque);
        setTotalItems(data.data.pagination.total_items)
        setTotalPages(data.data.pagination.total_pages)
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleFilterByProduct = (event) => {
    // setPage(0);
    setFilterProduct(event.target.value);
  };

  const clearFilterProduct = () => {
    const apiEndpoint = `/find/estoque/pagination?page=${1}&per_page=${rowsPerPage}&product_name=${""}&filter_column=${""}&order=${""}`;

    const response = api
      .get(apiEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setEstoqueData(data.data.estoque.estoque);
        setTotalItems(data.data.pagination.total_items)
        setTotalPages(data.data.pagination.total_pages)
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleClearFilters = () => {
    setFilterProduct("");
    setFilter("");
    setFilterOrder("");
    clearFilterProduct();
  };

  const isNotFound = !estoqueData.length && !!estoqueData;

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleOrderChange = (event) => {
    setFilterOrder(event.target.value);
  };

  const handleSearchProduct = () => {
    setPage(0);
    const apiEndpoint = `/find/estoque/pagination?page=${1}&per_page=${rowsPerPage}&product_name=${filterProduct}&filter_column=${filter}&order=${filterOrder}`;

    const response = api
      .get(apiEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setEstoqueData(data.data.estoque.estoque);
        setTotalItems(data.data.pagination.total_items)
        setTotalPages(data.data.pagination.total_pages)
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setAlertMessage("");
    setAlertSeverity("success");
  };

  const handleDeleteAlert = () => {
    setAlertSeverity("success");
    setAlertMessage("Valor deletado!");
    setIsAlertOpen(true);
    handleSearchProduct();
  };

  const handleEditAlert = () => {
    setAlertSeverity("success");
    setAlertMessage("Valor Editado!");
    setIsAlertOpen(true);
    handleSearchProduct();
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchProduct();
    }
  };

  return (
    <>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={10000}
        onClose={handleCloseAlert}
      >
        <Alert
          variant="filled"
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
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "15px 100px",
          alignItems: "center",
        }}
      >
        <div>
          <TextField
            value={filterProduct}
            id="select-produto-id"
            onChange={handleFilterByProduct}
            onKeyDown={handleEnterKeyPress}
            // style={{ minWidth: 180, maxWidth: "100%" }}
            label="Produto"
          />
          <TextField
            id="outlined-select-filter"
            select
            displayEmpty
            label="Filtro"
            onChange={handleFilterChange}
            value={filter}
            style={{ marginLeft: "20px", height: "56px", minWidth: "160px" }}
          >
            {filtroOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-order"
            select
            displayEmpty
            onChange={handleOrderChange}
            value={filterOrder}
            label="Ordem"
            style={{ marginLeft: "20px", height: "56px", minWidth: "153px" }}
          >
            <MenuItem key={"asc"} value={"asc"}>
              {"Menor > maior"}
            </MenuItem>
            <MenuItem key={"desc"} value={"desc"}>
              {"Maior > menor"}
            </MenuItem>
          </TextField>
          <Button
            onClick={handleSearchProduct}
            variant={"outlined"}
            style={{ marginLeft: "20px", height: "56px" }}
          >
            Buscar
          </Button>
          <Button
            onClick={handleClearFilters}
            variant={"outlined"}
            style={{ height: "56px", marginLeft: "20px" }}
          >
            Limpar Filtros
          </Button>
        </div>
      </div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={estoqueData.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {estoqueData
                .map((data) => {
                  const {
                    id,
                    nome,
                    quantidade,
                    unidade_medida,
                    adicionado_em,
                  } = data;

                  return (
                    <ExpandableTableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      expandComponent={
                        <TableCell align="left" colSpan={8}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                maxWidth: "550px",
                              }}
                            >
                              <Typography
                                style={{
                                  fontWeight: 700,
                                  marginRight: "10px",
                                }}
                              >
                                Observação:
                              </Typography>
                              <Typography style={{ fontWeight: 300 }}>
                                {"Nenhuma."}
                              </Typography>
                            </div>
                          </div>
                        </TableCell>
                      }
                    >
                      <TableCell align="center" style={{width: "400px"}}>{nome}</TableCell>
                      <TableCell align="right">{quantidade}</TableCell>
                      <TableCell align="center">{unidade_medida}</TableCell>
                      <TableCell align="center">{adicionado_em}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="large"
                          color="inherit"
                          idProduto={id}
                          nomeProduto={nome}
                          adicionadoEm={adicionado_em}
                          quantidade={quantidade}
                          unidade_medida={unidade_medida}
                          onClick={handleOpenMenu}
                        >
                          <Iconify icon={"eva:more-vertical-fill"} />
                        </IconButton>
                      </TableCell>
                    </ExpandableTableRow>
                  );
                })}
            </TableBody>
            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: "center",
                        boxShadow: "none",
                      }}
                    >
                      <Typography
                        variant="h6"
                        paragraph
                        style={{ fontWeight: "bold" }}
                      >
                        Não encontrado
                      </Typography>

                      <Typography variant="body2">
                        Não foi encontrado nenhum produto correspondente aos
                        filtros selecionados.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Linhas por página:"}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
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
        <EditEstoqueModal
          idProduto={idProdutoAtual}
          nomeProduto={nomeProdutoAtual}
          quantidadeProduto={quantidadeProdutoAtual}
          unidadeMedida={unidadeMedidaAtual}
          onClose={handleCloseMenu}
          handleEditAlert={handleEditAlert}
        />

        <DeleteEstoqueModal
          idProduto={idProdutoAtual}
          nomeProduto={nomeProdutoAtual}
          adicionadoEm={adicionadoEmAtual}
          onClose={handleCloseMenu}
          handleDeleteAlert={handleDeleteAlert}
        />
      </Popover>
    </>
  );
}
