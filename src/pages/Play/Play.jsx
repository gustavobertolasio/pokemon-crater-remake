import React, { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import Game from "./components/Game/Game";
import MapList from "./components/MapList/MapList";
import { enterMap } from "../../api/Api";
import PositionContext from "../../contexts/GameContext";

const PlayWrapper = styled.div`
  display: flex;
  height: 768px;
`;

const Play = () => {
  const [chosenMap, setChosenMap] = useState(null);
  const [pos, setPos] = useState(1);

  const { user } = useContext(UserContext);

  const handleMapChoose = (map) => {
    setChosenMap(map);
    enterMap(map.ID, user.ID, setPos);
  };

  return (
    <PositionContext.Provider value={pos}>
      <PlayWrapper className="container mt-16">
        {chosenMap && <Game map={chosenMap} setPos={setPos} />}
        {!chosenMap && <MapList chooseMap={handleMapChoose} />}
      </PlayWrapper>
    </PositionContext.Provider>
  );
};
export default Play;
