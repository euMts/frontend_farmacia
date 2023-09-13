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
import DeleteModal from "../deleteModal";
import EditVendaModal from "../editVendaModal";
import api from "../../connection/api";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TABLE_HEAD = [
  { id: "spacing", label: "", alignDirection: "center" },
  { id: "nome", label: "Nome", alignDirection: "center" },
  { id: "quantidade", label: "Quantidade", alignDirection: "center" },
  { id: "valor_unitario", label: "Valor Unitário", alignDirection: "center" },
  { id: "data_venda", label: "Data da Venda", alignDirection: "center" },
  { id: "adicionado_em", label: "Adicionado em", alignDirection: "center" },
];

// const vendasData = [
//   {
//     id: 0,
//     nome: "Produto 1",
//     quantidade: 3,
//     valor_unitario: "R$ 10,00",
//     data_venda: "29/07/2023",
//     adicionado_em: "29/07/2023",
//   },
//   {
//     id: 1,
//     nome: "Produto 2",
//     quantidade: 3,
//     valor_unitario: "R$ 10,00",
//     data_venda: "22/07/2023",
//     adicionado_em: "27/07/2023",
//   },
//   {
//     id: 2,
//     nome: "Produto 3",
//     quantidade: 6,
//     valor_unitario: "R$ 10,00",
//     data_venda: "19/07/2023",
//     adicionado_em: "21/07/2023",
//   },
//   {
//     id: 3,
//     nome: "Produto 4",
//     quantidade: 5,
//     valor_unitario: "R$ 30,00",
//     data_venda: "22/07/2023",
//     adicionado_em: "22/07/2023",
//   },
//   {
//     id: 4,
//     nome: "Produto 5",
//     quantidade: 3,
//     valor_unitario: "R$ 120,00",
//     data_venda: "23/07/2023",
//     adicionado_em: "24/07/2023",
//   },
//   {
//     id: 5,
//     nome: "Produto 1",
//     quantidade: 2,
//     valor_unitario: "R$ 132,00",
//     data_venda: "21/07/2023",
//     adicionado_em: "21/07/2023",
//   },
// ];

export default function TableVendas() {
  const [vendasData, setVendasData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalItemsNames, setTotalItemsNames] = useState([0]);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [filterProduct, setFilterProduct] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idProdutoAtual, setIdProdutoAtual] = useState(null);
  const [nomeProdutoAtual, setNomeProdutoAtual] = useState("");
  const [adicionadoEmAtual, setAdicionadoEmAtual] = useState("");
  const [quantidadeProdutoAtual, setQuantidadeProdutoAtual] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [valorUnitarioProdutoAtual, setValorUnitarioProdutoAtual] =
    useState("");
  const [dataVendaProdutoAtual, setDataVendaProdutoAtual] = useState("");
  const handleOpenMenu = (event) => {
    const idProduto = event.currentTarget.getAttribute("idProduto");
    const nomeProduto = event.currentTarget.getAttribute("nomeProduto");
    const adicionadoEm = event.currentTarget.getAttribute("adicionadoEm");
    const quantidadeProduto =
      event.currentTarget.getAttribute("quantidadeProduto");
    const valorUnitarioProduto = event.currentTarget.getAttribute(
      "valorUnitarioProduto"
    );
    const dataVendaProduto =
      event.currentTarget.getAttribute("dataVendaProduto");
    setOpen(event.currentTarget);
    setIdProdutoAtual(idProduto);
    setNomeProdutoAtual(nomeProduto);
    setAdicionadoEmAtual(adicionadoEm);
    setQuantidadeProdutoAtual(quantidadeProduto);
    setValorUnitarioProdutoAtual(valorUnitarioProduto);
    setDataVendaProdutoAtual(dataVendaProduto);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

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

  const handleChangePage = async (event, newPage) => {
    const apiEndpoint = `/find/vendas/pagination?page=${
      newPage + 1
    }&per_page=${rowsPerPage}`;

    try {
      const response = await api.get(apiEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { vendas, pagination } = response.data;

      setVendasData(vendas.vendas);
      setTotalItems(pagination.total_items);
      setTotalPages(pagination.total_pages);
      setPage(newPage); // Update the page state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByProduct = (event) => {
    setPage(0);
    setFilterProduct(event.target.value);
  };

  const handleSearchProduct = () => {
    console.log(filterProduct)
  }

  const clearFilterProduct = () => {
    setFilterProduct("");
  };

  const handleClearFilters = () => {
    clearFilterProduct();
  };

  const isNotFound = !vendasData.length && !!vendasData;

  useEffect(() => {
    // Fetch data from your API using page and rowsPerPage as query parameters
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/find/vendas/pagination?page=${page + 1}&per_page=${rowsPerPage}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Now you can directly access the JSON response without calling .json()
        const { vendas, pagination } = response.data; // Assuming your response has a data property

        setVendasData(vendas.vendas);
        setTotalItems(pagination.total_items);
        setTotalPages(pagination.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  return (
    <>
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
            // style={{ minWidth: 180, maxWidth: "100%" }}
            label="Produto"
          />
          <Button
            onClick={handleSearchProduct}
            variant={"outlined"}
            style={{ marginLeft: "20px", height: "56px" }}
          >
            Buscar
          </Button>
        </div>

        <Button
          onClick={handleClearFilters}
          variant={"outlined"}
          style={{ height: "56px" }}
        >
          Limpar Filtros
        </Button>
      </div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead headLabel={TABLE_HEAD} />
            <TableBody>
              {vendasData.map((data) => {
                const {
                  id,
                  nome,
                  quantidade,
                  valor_unitario,
                  data_venda,
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
                              Valor total:
                            </Typography>
                            <Typography style={{ fontWeight: 300 }}>
                              R${" "}
                              {(
                                parseFloat(valor_unitario.replace("R$ ", "")) *
                                quantidade
                              ).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </Typography>
                          </div>
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
                              {"observacao"}
                            </Typography>
                          </div>
                        </div>
                      </TableCell>
                    }
                  >
                    <Tooltip
                      placement="right"
                      title={
                        <Typography fontSize={15}>{"nome_full"}</Typography>
                      }
                    >
                      <TableCell align="center">{nome}</TableCell>
                    </Tooltip>
                    <TableCell align="center">{quantidade}</TableCell>
                    <TableCell align="center">{valor_unitario}</TableCell>
                    <TableCell align="center">{data_venda}</TableCell>
                    <TableCell align="center">{adicionado_em}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="large"
                        color="inherit"
                        idProduto={id}
                        nomeProduto={nome}
                        adicionadoEm={adicionado_em}
                        quantidadeProduto={quantidade}
                        valorUnitarioProduto={valor_unitario}
                        dataVendaProduto={data_venda}
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
        count={totalPages} // Use the totalItems state variable
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
        <EditVendaModal
          idProduto={idProdutoAtual}
          nomeProduto={nomeProdutoAtual}
          quantidadeProduto={quantidadeProdutoAtual}
          valorUnitarioProduto={valorUnitarioProdutoAtual}
          dataVendaProduto={dataVendaProdutoAtual}
          onClose={handleCloseMenu}
        />
        <DeleteModal
          idProduto={idProdutoAtual}
          nomeProduto={nomeProdutoAtual}
          adicionadoEm={adicionadoEmAtual}
          onClose={handleCloseMenu}
        />
      </Popover>
    </>
  );
}
