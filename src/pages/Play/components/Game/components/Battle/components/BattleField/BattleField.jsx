import { delay } from "lodash";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import BattleGrass2 from "../../../../../../../../assets/battle_maps/battle_grass2.png";
import Ultraball from "../../../../../../../../assets/pokeballs/ultraball.png";
import UserContext from "../../../../../../../../contexts/UserContext";
import BattleInfo from "./components/BattleInfo/BattleInfo";

const BattleFieldWrapper = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  background-image: url(${BattleGrass2});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
`;

const SideWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PokemonInfoArea = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: ${(props) =>
    props.side === "left" ? "flex-end" : "flex-start"};
`;

const PokemonArea = styled.div`
  width: 100%;
  height: 60%;
`;

const PokemonWrapperImage = styled.div`
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PokemonImage = styled.img`
  width: 350px;
  height: 250px;
  object-position: center top;
  object-fit: ${(props) => (props.bottomPokemon ? "cover" : "contain")};
`;

const Pokeball = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 24px;
  transition: transform 0.1s;

  &.rotate-left {
    transform: rotate(-20deg);
  }

  &.rotate-right {
    transform: rotate(20deg);
  }
`;

const BattleField = ({
  trainerPokemon,
  wildPokemon,
  isCatchingPokemon,
  shakes,
  handleIsCatchingPokemon,
}) => {
  useEffect(() => {
    if (shakes && shakes.length) {
      let onceAnimationEnd = (el, animation) => {
        return new Promise((resolve) => {
          const onAnimationEndCb = () => {
            if (el) el.removeEventListener("animationend", onAnimationEndCb);
            resolve();
          };
          if (el) {
            el.addEventListener("animationend", onAnimationEndCb);
            el.style.animation = animation;
          }
        });
      };

      let wobble = async (element) => {
        await onceAnimationEnd(element, "wobble-hor-bottom .8s both");
      };

      let pokeball_center = async (element) => {
        await onceAnimationEnd(element, "center 1s");
      };

      let move_pokeball = async (el, index) => {
        if (isCatchingPokemon) {
          await pokeball_center(el);
          await wobble(el);
          if (index === 3 && shakes.length === 4)
            await new Promise((resolve) =>
              resolve(handleIsCatchingPokemon(true))
            );
        }
      };

      let end_catch = async (el) => {
        await pokeball_center(el);
        await new Promise((resolve) => resolve(handleIsCatchingPokemon(false)));
      };

      const $shakes = shakes.map((shake) =>
        shake ? move_pokeball : end_catch
      );

      let run = async () => {
        const pokeballElement = document.querySelector(".pokeball");
        for (let i = 0; i < $shakes.length; i++) {
          await $shakes[i](pokeballElement, i);
        }
      };
      run();
    }
  }, [shakes, isCatchingPokemon, handleIsCatchingPokemon]);
  return (
    <BattleFieldWrapper>
      <SideWrapper>
        <PokemonInfoArea side="left">
          <BattleInfo
            isUpperInfo
            actualHP={wildPokemon?.CURRENT_HP}
            maxHp={wildPokemon?.HP}
            pokemonLevel={wildPokemon?.POKEMON_LEVEL}
            pokemonName={wildPokemon?.POKEMON?.POKEMON_NAME}
          />
        </PokemonInfoArea>
        <PokemonArea isUpperInfo>
          <PokemonWrapperImage bottomPokemon>
            <PokemonImage
              bottomPokemon
              src={trainerPokemon?.GENERATED_POKEMON?.POKEMON?.BACK_SPRITE}
            />
          </PokemonWrapperImage>
        </PokemonArea>
      </SideWrapper>

      <SideWrapper>
        <PokemonArea>
          <PokemonWrapperImage>
            {!isCatchingPokemon && (
              <PokemonImage src={wildPokemon?.POKEMON.DEFAULT_SPRITE} />
            )}
            {isCatchingPokemon && (
              <Pokeball className="pokeball" src={Ultraball} />
            )}
          </PokemonWrapperImage>
        </PokemonArea>
        <PokemonInfoArea side="right">
          <BattleInfo
            actualHP={trainerPokemon?.GENERATED_POKEMON?.CURRENT_HP}
            maxHp={trainerPokemon?.GENERATED_POKEMON?.HP}
            pokemonLevel={trainerPokemon?.GENERATED_POKEMON?.POKEMON_LEVEL}
            pokemonName={
              trainerPokemon?.GENERATED_POKEMON?.POKEMON?.POKEMON_NAME
            }
          />
        </PokemonInfoArea>
      </SideWrapper>
    </BattleFieldWrapper>
  );
};
export default BattleField;
