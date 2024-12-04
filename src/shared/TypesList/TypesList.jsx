import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { types } from "../../UI/themes";
import { useTranslation } from "react-i18next";

const TypesWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  .mr-4 {
    margin-right: 4px;
  }
`;

const Type = styled.div`
  width: fit-content;
  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.backgroundcolor};
  border-radius: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: white;
`;

const typeList = {};
Object.entries(types).forEach((type) => (typeList[type[0]] = type[1]));

const TypesList = ({ pokemonTypes }) => {
  const { t } = useTranslation();
  const classNameVerification = (index) => {
    return index === 0 && pokemonTypes?.TYPES?.length > 1 ? "mr-4" : "";
  };

  return (
    <TypesWrapper className="mt-8">
      {pokemonTypes?.TYPES?.map((typeObj, index) => (
        <ThemeProvider theme={typeList[typeObj?.TYPENAME.toLowerCase()]}>
          <Type key={index} className={classNameVerification(index)}>
            {t(`shared.pokemon-card.${typeObj?.TYPENAME.toLowerCase()}`)}
          </Type>
        </ThemeProvider>
      ))}
    </TypesWrapper>
  );
};
export default TypesList;
