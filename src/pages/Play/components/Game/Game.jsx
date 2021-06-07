import React, { useState } from "react";
import styled from "styled-components";
import InfoArea from "./components/InfoArea/InfoArea";
import Map from "./components/Map/Map";
import PositionContext from "../../../../contexts/GameContext";
import { searchPokemonInSlot } from "../../../../api/Api";

const GameWrapper = styled.div`
display:flex;
width 100%;
height:100%;
`;

const Game = ({ map }) => {
  const [pos, setPos] = useState(1);
  const [foundPokemon, setFoundPokemon] = useState(null);

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

    searchPokemonInSlot(
      config.map.ID,
      pos + directions[direction],
      setFoundPokemon
    ).then(() => setPos(pos + directions[direction]));
  };

  config = {
    ...config,
    walk,
    foundPokemon,
  };

  return (
    <PositionContext.Provider value={pos}>
      <GameWrapper>
        <Map config={config} />
        <InfoArea config={config} />
      </GameWrapper>
    </PositionContext.Provider>
  );
};
export default Game;
