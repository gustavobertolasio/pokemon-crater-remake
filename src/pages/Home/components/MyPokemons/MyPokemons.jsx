import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import DndWrapper from "../../../../common/DndWrapper";
import MyPokemonsContext from "../../../../contexts/MyPokemonsContext";
import PokemonCard from "../../../../shared/PokemonCard/PokemonCard";
import { DefaultHomeCard, DefaultInput } from "../../../../UI/index";

const MyPokemonsCard = styled(DefaultHomeCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 810px;
  padding-bottom: 24px;

  .pokemons-showoff {
    display: flex;
    flex-wrap: wrap;
    justify-content: ${({ children }) =>
      children[1]?.props.children?.length === 6
        ? "space-between"
        : "flex-start"};
    width: 95%;
  }

  .w-25 {
    padding: 0 16px;
  }
`;

const Input = styled(DefaultInput)``;

const MyPokemons = () => {
  const { t } = useTranslation();
  const myPokemons = useContext(MyPokemonsContext);
  const [filter, setFilter] = useState("");

  return (
    <MyPokemonsCard className="mt-16">
      <h4 className="mt-16">{t("pages.home.my-pokemons")}</h4>
      <div className="w-100">
        <div className="w-25">
          <Input
            onChange={($event) => setFilter($event.target.value)}
            placeholder={t("pages.home.my-pokemons-filter")}
          />
        </div>
      </div>
      <div id="showoff" className="pokemons-showoff mt-16">
        <DndWrapper id="showoff">
          {myPokemons?.TRAINER_POKEMONS.map(
            (GENERATED_POKEMON) =>
              GENERATED_POKEMON &&
              GENERATED_POKEMON?.GENERATED_POKEMON && (
                <PokemonCard
                  key={GENERATED_POKEMON?.GENERATED_POKEMON?.ID}
                  slot={GENERATED_POKEMON}
                  filter={filter}
                  showTypeCards={true}
                  showPokemonName={true}
                  droppable={false}
                ></PokemonCard>
              )
          )}
        </DndWrapper>
      </div>
    </MyPokemonsCard>
  );
};
export default MyPokemons;
