import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import MyPokemonsContext from "../../../../contexts/MyPokemonsContext";
import Input from "../../../../shared/Input/Input";
import PokemonCard from "../../../../shared/PokemonCard/PokemonCard";
import { DefaultHomeCard } from "../../../../UI/index";

const MyPokemonsCard = styled(DefaultHomeCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 810px;
  padding-bottom: 24px;

  .pokemons-showoff {
    display: flex;
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
            onChange={setFilter}
            placeholder={t("pages.home.my-pokemons-filter")}
          />
        </div>
      </div>
      <div className="pokemons-showoff mt-16">
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
      </div>
    </MyPokemonsCard>
  );
};
export default MyPokemons;
