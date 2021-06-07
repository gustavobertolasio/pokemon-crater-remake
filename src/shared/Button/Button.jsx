import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { buttonPrimary, buttonSecondary } from "../../UI/themes";

const Buttonzera = styled.button`
  padding: 8px 16px;
  width: fit-content;
  height: fit-content;
  border: none;
  background-color: transparent;
  font-size: 16px;
  border-radius: 5px;
  border: ${(props) => (props.theme.border)};
  background-color: ${(props) => (props.theme.backgroundcolor)};
  color: ${(props) => (props.theme.color)};
  cursor: pointer;

  :hover {
    animation-name: ${(props) => (props.theme.effect)};
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes primaryFade {
    to {
      background-color: ${buttonPrimary.effectColor};
    }
  }

  @keyframes secondaryFade {
    to {
      background-color: ${buttonSecondary.effectColor};
    }
  }
`;

const Button = ({ buttonTitle, isPrimary }) => {
  return (
    <ThemeProvider theme={isPrimary ? buttonPrimary : buttonSecondary}>
      <Buttonzera>{buttonTitle}</Buttonzera>
    </ThemeProvider>
  );
};
export default Button;
