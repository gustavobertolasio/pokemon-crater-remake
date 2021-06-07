import React from "react";
import styled from "styled-components";
import { DefaultShadowedCard } from "../../../../../../UI";
import Controls from "./components/Controls/Controls";
import Bag from "./components/Bag/Bag";
import PokemonCard from "../../../../../../shared/PokemonCard/PokemonCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";

const InfoAreaWrapper = styled(DefaultShadowedCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 100%;
  border-radius: 0 10px 10px 0;
  background-color: #0084ff;
`;

const FoundPokemonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  width: 120px;
  height: 150px;
  padding: 0 0 8px 0;

  h6 {
    text-align: center;
  }
`;

const InfoArea = ({ config }) => {
  const { t } = useTranslation();
  return (
    <DndProvider backend={HTML5Backend}>
      <InfoAreaWrapper>
        <Controls walk={config.walk}></Controls>
        <FoundPokemonArea className="mt-16">
          {config.foundPokemon && (
            <PokemonCard
              slot={{ GENERATED_POKEMON: config.foundPokemon }}
              showTypeCards={false}
              showPokemonName={true}
              canRemoveFromTeam={false}
              droppable={false}
            />
          )}
          {!config.foundPokemon && <h6>{t("game.no-poke")}</h6>}
        </FoundPokemonArea>
        <Bag />
      </InfoAreaWrapper>
    </DndProvider>
  );
};
export default InfoArea;
