import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import DndWrapper from "../../../../../../common/DndWrapper";
import Button from "../../../../../../shared/Button/Button";
import PokemonCard from "../../../../../../shared/PokemonCard/PokemonCard";
import { DefaultShadowedCard } from "../../../../../../UI";
import Bag from "./components/Bag/Bag";
import Controls from "./components/Controls/Controls";

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

const FoundPokemon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoArea = ({ config, handleBattle }) => {
  const { t } = useTranslation();
  const handleBattleClick = async () => {
    handleBattle();
  };

  return (
      <InfoAreaWrapper id="info">
        <DndWrapper id="info">
        <Controls walk={config.walk}></Controls>
        <FoundPokemonArea className="mt-16">
          {config.foundPokemon && (
            <FoundPokemon>
              <PokemonCard
                slot={{ GENERATED_POKEMON: config.foundPokemon }}
                showTypeCards={false}
                showPokemonName={true}
                canRemoveFromTeam={false}
                droppable={false}
              />
              <div className="mt-8" />
              <Button
                buttonTitle="Battle!"
                isPrimary
                clickCallback={() => handleBattleClick()}
              />
            </FoundPokemon>
          )}
          {!config.foundPokemon && <h6>{t("game.no-poke")}</h6>}
        </FoundPokemonArea>
        <Bag />
        </DndWrapper> 
      </InfoAreaWrapper>
  );
};
export default InfoArea;
