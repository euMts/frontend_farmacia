import React, { useState } from "react";
import { Box, Button, MenuItem, Modal, Typography } from "@mui/material";
import Iconify from "../iconify/Iconify";
import { COLORS } from "../../assets/colors";
import { ModalButtons } from "./deleteModalElements";
import api from "../../connection/api";

export default function DeleteModal({
  idProduto,
  nomeProduto,
  adicionadoEm,
  setProductDeletedAlert,
  setProductNotDeletedAlert,
  onClose,
}) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    onClose();
  };

  const deleteApi = async (idProduto) => {
    console.log(`deletando produto de ID ${idProduto}`)
    try {
      const response = await api.delete(`/produto/${idProduto}`);
      if (response.status === 200) {
        setProductDeletedAlert(true);
        handleDeleteModalClose();
      } else {
        setProductNotDeletedAlert(true);
      }
    } catch (error) {
      setProductNotDeletedAlert(true);
    }
  };

  const handleDelete = (idProduto) => {
    deleteApi(idProduto);
  };
  return (
    <>
      <MenuItem
        onClick={() => handleDeleteModalOpen()}
        sx={{ color: "error.main" }}
      >
        <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
        Deletar
      </MenuItem>
      <Modal open={deleteModalOpen} onClose={handleDeleteModalClose}>
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
            Tem certeza que deseja excluir o registro de:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {nomeProduto}, adicionado em: {adicionadoEm} ?
          </Typography>
          <ModalButtons>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(idProduto)}
            >
              Excluir
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleDeleteModalClose()}
            >
              Cancelar
            </Button>
          </ModalButtons>
        </Box>
      </Modal>
    </>
  );
}
