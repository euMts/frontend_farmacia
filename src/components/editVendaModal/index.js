import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "../iconify/Iconify";
import { COLORS } from "../../assets/colors";
import { ModalButtons } from "./editModalElements";
import api from "../../connection/api";

export default function EditVendaModal({
  idProduto,
  nomeProduto,
  quantidadeProduto,
  valorUnitarioProduto,
  dataVendaProduto,
  setProductEditedAlert,
  setProductNotEditedAlert,
  onClose,
}) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [newProductValue, setNewProductValue] = useState("");
  const [newProductDate, setNewProductDate] = useState("");

  const handleNewProductName = (newValue) => {
    setNewProductName(newValue.target.value);
  };
  const handleNewProductQuantity = (newValue) => {
    setNewProductQuantity(newValue.target.value);
  };
  const handleNewProductValue = (newValue) => {
    setNewProductValue(newValue.target.value);
  };
  const handleNewProductDate = (newValue) => {
    setNewProductDate(newValue.target.value);
  };

  const handleEditModalOpen = () => setEditModalOpen(true);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    onClose();
  };

  const editApi = async (idProduto) => {
    console.log(`editando produto de ID ${idProduto}`);
    console.log(`novo nome ${newProductName}`);
    console.log(`nova quantidade ${newProductQuantity}`);
    console.log(`novo valor unitario ${newProductValue}`);
    console.log(`nova data venda ${newProductDate}`);
    try {
      const response = await api.patch(`/produto/${idProduto}`);
      if (response.status === 200) {
        setProductEditedAlert(true);
        handleEditModalClose();
      } else {
        setProductNotEditedAlert(true);
      }
    } catch (error) {
      setProductNotEditedAlert(true);
    }
  };

  const handleEdit = (idProduto) => {
    editApi(idProduto);
  };
  return (
    <>
      <MenuItem onClick={() => handleEditModalOpen()} sx={{ color: "black" }}>
        <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
        Editar
      </MenuItem>
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            backgroundColor: "#fff",
            border: "2px solid #fff",
            padding: " 20px",
            boxShadow: 24,
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editor de registro
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Nome:
          </Typography>
          <TextField
            onChange={handleNewProductName}
            label={nomeProduto}
            placeholder=""
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Quantidade:
          </Typography>
          <TextField
            onChange={handleNewProductQuantity}
            label={quantidadeProduto}
            placeholder=""
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Valor Unitário:
          </Typography>
          <TextField
            onChange={handleNewProductValue}
            label={valorUnitarioProduto}
            placeholder=""
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Data da Venda:
          </Typography>
          <TextField
            onChange={handleNewProductDate}
            label={dataVendaProduto}
            placeholder=""
          />
          <ModalButtons>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleEditModalClose()}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleEdit(idProduto)}
            >
              Salvar
            </Button>
          </ModalButtons>
        </Box>
      </Modal>
    </>
  );
}
