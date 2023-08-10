import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  LoginWrapper,
  LoginTitle,
  LoginSubTitle,
  LoginContainer,
  LabelError,
  ButtonWrapper,
} from "./forgotPasswordElements";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    if (email.length === 0 || !email.includes("@") || !email.includes(".")) {
      setEmailError("Por favor, revise o campo 'e-mail'");
    } else {
        alert("Email enviado")
        navigate("/login")
      //   await sendMail(email);
    }
  };

  let navigate = useNavigate();

  return (
    <>
      <LoginContainer>
        <LoginWrapper>
          <LoginTitle>Entrar em NOME_DO_SISTEMA</LoginTitle>
          <LoginSubTitle>
            Entraremos em contato assim que possível.
          </LoginSubTitle>

          <Stack spacing={3} sx={{ my: 2 }}>
            <TextField
              name="email"
              label="Endereço de E-mail"
              value={email}
              onChange={(e) => [setEmail(e.target.value), setEmailError("")]}
              error={!!emailError}
            />
            <LabelError>{emailError}</LabelError>
          </Stack>

          <ButtonWrapper>
            <LoadingButton
              type="submit"
              variant="contained"
              color="error"
              size="medium"
              onClick={() => navigate("/login")}
            >
              Cancelar
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              onClick={handleClick}
            >
              Enviar
            </LoadingButton>
          </ButtonWrapper>
        </LoginWrapper>
      </LoginContainer>
    </>
  );
};

export default ForgotPasswordPage;
