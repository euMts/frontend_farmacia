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

export default function EditEstoqueModal({
  idProduto,
  nomeProduto,
  quantidadeProduto,
  unidadeMedida,
  setProductEditedAlert,
  setProductNotEditedAlert,
  onClose,
  handleEditAlert
}) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [newProductUnity, setNewProductUnity] = useState("");

  const handleNewProductName = (newValue) => {
    setNewProductName(newValue.target.value);
  };
  const handleNewProductQuantity = (newValue) => {
    setNewProductQuantity(newValue.target.value);
  };
  const handleNewProductUnity = (newValue) => {
    setNewProductUnity(newValue.target.value);
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
    console.log(`nova unidade de medida ${newProductUnity}`);

    const editedFields = {};

    if (newProductName !== "") {
      editedFields.nome = newProductName;
    }
    if (newProductQuantity !== "") {
      editedFields.quantidade = newProductQuantity;
    }
    if (newProductUnity !== "") {
      editedFields.unidade_medida = newProductUnity;
    }

    try {
      const response = await api.put(`/find/estoque/${idProduto}`, editedFields);
      if (response.status === 200) {
        handleEditAlert()
        handleEditModalClose();
      } else {
        setProductNotEditedAlert(true);
      }
      handleEditModalClose();
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
            onChange={handleNewProductUnity}
            label={unidadeMedida}
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
