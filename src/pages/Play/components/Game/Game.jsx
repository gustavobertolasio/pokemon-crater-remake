import { gql, useSubscription } from "@apollo/client";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { generatePokemon, searchPokemonInSlot } from "../../../../api/Api";
import UserContext from "../../../../contexts/UserContext";
import InfoArea from "./components/InfoArea/InfoArea";
import Map from "./components/Map/Map";
import { walkInMap } from "../../../../api/Api";
import PositionContext from "../../../../contexts/GameContext";
import Battle from "./components/Battle/Battle";

const GameWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Game = ({ map, setPos }) => {
  const [foundPokemon, setFoundPokemon] = useState(null);
  const { user } = useContext(UserContext);
  const pos = useContext(PositionContext);

  const GET_USERS_IN_MAP = gql`
    subscription {
      usersInMap {
        ID
        PLAYER_SLOT
        USER {
          ID
          USERNAME
          TRAINER
        }
      }
    }
  `;

  const { data } = useSubscription(GET_USERS_IN_MAP);

  let config = {
    map,
  };
  const qtSlot = config.map.MAP_WIDTH * config.map.MAP_HEIGHT;

  const canWalk = (qtPosWalked) =>
    pos + qtPosWalked > 0 || pos + qtPosWalked <= qtSlot ? qtPosWalked : 0;

  const walk = (direction) => {
    const directions = {
      up: canWalk(-config.map.MAP_WIDTH),
      down: canWalk(config.map.MAP_WIDTH),
      left: canWalk(-1),
      right: canWalk(1),
    };

    walkInMap(config.map.ID, user.ID, pos + directions[direction], setPos).then(
      () => searchPokemonInSlot(config.map.ID, pos, setFoundPokemon)
    );
  };

  config = {
    ...config,
    walk,
    foundPokemon,
  };

  const [generatedPokemon, setGeneratedPokemon] = useState(null);

  const handleBattle = async () => {
    await generatePokemon(
      config.foundPokemon.POKEMON.ID,
      config.map.ID,
      setGeneratedPokemon
    );
  };

  return (
    <GameWrapper>
      <Map config={config} usersInMap={data?.usersInMap} />
      <InfoArea config={config} handleBattle={handleBattle} />
      <Battle
        onBattle={!!generatedPokemon}
        trainerId={user.ID}
        generatedPokemon={generatedPokemon}
        setGeneratedPokemon={setGeneratedPokemon}
      />
    </GameWrapper>
  );
};
export default Game;
