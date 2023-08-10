import styled from "styled-components";
import { COLORS } from "../../assets/colors";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${COLORS.white};
  padding: 24px;
`;

export const LoginWrapper = styled.div`
  width: 500px;
  display: "flex";
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const LoginTitle = styled.h1`
  font-size: 1.5rem;
  padding-bottom: 5px;
`;

export const LoginSubTitle = styled.h2`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const LabelError = styled.label`
  font-size: 14px;
  color: red;
`;
