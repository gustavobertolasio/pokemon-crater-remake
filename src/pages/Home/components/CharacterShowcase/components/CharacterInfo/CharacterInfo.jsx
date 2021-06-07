import React from "react";
import styled from "styled-components";
import InfoField from "./components/InfoField";
import { useTranslation } from "react-i18next";

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100px;
  padding: 0 16px;
`;

function CharacterInfo({ pokemons, character }) {
  const { t } = useTranslation();

  return (
    <InfoWrapper className="mt-16">
      <InfoField title={t("pages.home.age")} value={character?.AGE} />
      <InfoField title={t("pages.home.badges")} value={character?.BADGES} />
      <InfoField title={t("pages.home.pokemons")} value={pokemons} />
      <InfoField title={t("pages.home.victories")} value={character?.VICTORIES} />
      <InfoField title={t("pages.home.losses")} value={character?.LOSSES} />
    </InfoWrapper>
  );
}
export default CharacterInfo;
