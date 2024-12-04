import styled from "styled-components";
import { colors } from "./constants";

export const DefaultPage = styled.div`
  padding-top: 16px;
  width: 1440px;
  height: 95vh;
  background-color: ${colors.complementary_blue_3};
`;

export const DefaultHomeCard = styled.div`
  background-color: ${colors.complementary_blue_1};
  border-radius: 5px;
  box-shadow: 0 1px 1px 0 rgba(122, 109, 96, 0.24);
`;

export const DefaultShadowedCard = styled.div`
  box-shadow: 0 1px 1px 0 rgba(122, 109, 96, 0.24);
`;

export const DefaultPokemonCard = styled.div``;

export const DefaultInput = styled.input`
  width: 100%;
  height: fit-content;
  border: 1px solid gray;
  color: black;
  border-radius: 5px;
  font-size: 14px;
  padding: 8px 4px;
`;
