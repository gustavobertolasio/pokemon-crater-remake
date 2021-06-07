import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const LanguagesWrapper = styled.div`
  width: fit-content;
  height: 50px;
  position: absolute;
  top: 70%;
  left: 98%;
`;

const Languages = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  
  return (
    <LanguagesWrapper>
      <h6 onClick={() => changeLanguage("en")}>en</h6>
      <h6 onClick={() => changeLanguage("pt")}>pt</h6>
    </LanguagesWrapper>
  );
};
export default Languages;
