import React, { useContext, useState } from "react";
import {
  Link,
  Typography,
  Divider,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  LoginWrapper,
  LoginTitle,
  LoginSubTitle,
  LoginContainer,
  LabelError,
} from "./loginPageElements";
import { AuthContext } from "../../contexts/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signed } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if (email.length === 0 || !email.includes("@") || !email.includes(".")) {
      setEmailError("Por favor, revise o campo 'e-mail'");
    } else if (password.length < 4) {
      setPasswordError("Por favor, revise o campo 'senha'");
    } else {
      await signIn(email, password);
    }
  };

  let navigate = useNavigate();

  if (signed) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <>
        <LoginContainer>
          <LoginWrapper>
            <LoginTitle>Entrar em NOME_DO_SISTEMA</LoginTitle>
            <LoginSubTitle>
              Não tem uma conta?{" "}
              <Link style={{ cursor: "pointer" }}>Cadastre-se</Link>
            </LoginSubTitle>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OU
              </Typography>
            </Divider>
            <Stack spacing={3}>
              <TextField
                name="email"
                label="Endereço de E-mail"
                value={email}
                onChange={(e) => [setEmail(e.target.value), setEmailError("")]}
                error={!!emailError}
              />
              <TextField
                name="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => [
                  setPassword(e.target.value),
                  setPasswordError(""),
                ]}
                error={!!passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ my: 2 }}
            >
              <Link
                variant="subtitle2"
                underline="hover"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/recovery")}
              >
                Esqueceu a senha?
              </Link>
            </Stack>

            <LabelError>{emailError}</LabelError>
            <LabelError>{passwordError}</LabelError>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Entrar
            </LoadingButton>
          </LoginWrapper>
        </LoginContainer>
      </>
    );
  }
};

export default LoginPage;
