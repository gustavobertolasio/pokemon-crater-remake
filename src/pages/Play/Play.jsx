import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Game from "./components/Game/Game";
import MapList from "./components/MapList/MapList";

const PlayWrapper = styled.div`
  display: flex;
  height: 960px;
  height: 768px;
`;

const Play = () => {
  const [chosenMap, setChosenMap] = useState(null);

  return (
    <PlayWrapper className="container mt-16">
      {chosenMap && <Game map={chosenMap}/>}
      {!chosenMap && <MapList chooseMap={setChosenMap}/>}
    </PlayWrapper>
  );
};
export default Play;
