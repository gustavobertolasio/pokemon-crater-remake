import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import TeamContext from "../../../../contexts/TeamContext";
import PokemonCard from "../../../../shared/PokemonCard/PokemonCard";
import { DefaultHomeCard } from "../../../../UI/index";
import { usePromiseTracker } from "react-promise-tracker";
import DndWrapper from "../../../../common/DndWrapper";

const CurrentPokemonShowcaseWrapper = styled(DefaultHomeCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding-bottom: 16px;
  width: 810px;

  .my-pokemon-title {
    width: 100%;
    text-align: center;
  }
`;

const TeamShowoff = styled.div`
  display: flex;
  justify-content: ${({ theme }) =>
    theme.length < 6 ? "flex-start" : "space-between"};
  width: 95%;
`;

function CurrentPokemonShowcase({
  homeChangePokes,
  homeRemovePokeFromTeam,
  homeAddPoke,
}) {
  const { t } = useTranslation();
  const team = useContext(TeamContext);
  const { promiseInProgress } = usePromiseTracker({
    area: "current-team-showoff",
  });

  const changePokes = (pokemonIdBeingEquipped, slot) => {
    homeChangePokes(pokemonIdBeingEquipped, slot);
  };

  const addPoke = (pokemonIdBeingEquipped, slot) => {
    homeAddPoke(pokemonIdBeingEquipped, slot);
  };

  const removePokeFromTeam = (slot) => {
    homeRemovePokeFromTeam(slot);
  };

  const canRemoveFromTeam = () =>
    team.filter((team) => team.GENERATED_POKEMON).length > 1 ? true : false;

  return (
    <CurrentPokemonShowcaseWrapper id="showcase">
      <DndWrapper id="showcase">
        <h4 className="my-pokemon-title mt-16">
          {t("pages.home.current-team")}
        </h4>

        <TeamShowoff theme={team} className="mt-16">
          {team?.map((slot) => (
            <PokemonCard
              key={slot?.GENERATED_POKEMON?.ID || 0}
              slot={slot}
              showTypeCards={true}
              canRemoveFromTeam={canRemoveFromTeam()}
              showPokemonName={true}
              droppable={true}
              removePokeFromTeam={removePokeFromTeam}
              changePokes={slot.GENERATED_POKEMON ? changePokes : addPoke}
            />
          ))}
        </TeamShowoff>
      </DndWrapper>
    </CurrentPokemonShowcaseWrapper>
  );
}
export default CurrentPokemonShowcase;
