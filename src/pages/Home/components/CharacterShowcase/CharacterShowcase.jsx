import React from "react";
import styled from "styled-components";
import Trainer from "../../../../shared/Trainer/Trainer";
import { DefaultHomeCard } from "../../../../UI";
import CharacterInfo from "./components/CharacterInfo/CharacterInfo";
import { useTranslation } from "react-i18next";

const CharacterWrapper = styled(DefaultHomeCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  padding-bottom: 16px;
`;

const TrainerImage = styled.img`
  width: 150px;
  height: 200px;
`;

function CharacterShowcase({ character }) {
  const { t } = useTranslation();
  return (
    <CharacterWrapper>
      <h2 className="mt-16">{character?.USERNAME}</h2>
      <h6>{t("pages.home.from")} {character?.REGION}</h6>
      <TrainerImage
        className="mt-16"
        src={Trainer[character?.TRAINER]}
      ></TrainerImage>
      <CharacterInfo
        pokemons={character?.pokemons?.ownedPokemons.length}
        character={character}
      ></CharacterInfo>
    </CharacterWrapper>
  );
}
export default CharacterShowcase;
