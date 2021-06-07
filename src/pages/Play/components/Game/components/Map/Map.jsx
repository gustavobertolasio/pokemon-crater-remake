import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import PositionContext from "../../../../../../contexts/GameContext";
import UserContext from "../../../../../../contexts/UserContext";
import Ethan from "../../../../../../assets/trainers/low/ethan.png";
import Dawn from "../../../../../../assets/trainers/low/dawn.png";
import { getMapSlots } from "../../../../../../api/Api";
import { getImage } from "../../../ArchiveToMap";

const characters = {
  ethan: Ethan,
  dawn: Dawn,
};

const MapWrapper = styled.div`
    width 960px;
    height: 768px;
`;

const SlotWrapper = styled.div`
display:flex;
width 960px;
flex-wrap: wrap;
position:relative;
`;

const MapSlot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 62px;
  width: 62px;
  border: 1px solid gray;
  background-color: ${({ currentPos }) =>
    currentPos ? "rgba(255,0,0,0.2)" : "transparent"};

  .char {
    width: 50%;
    height: 55%;
  }
`;

const MapImg = styled.img`
  width: inherit;
  height: inherit;
  z-index: 0;
  position: absolute;
`;

const Map = ({ config }) => {
  const pos = useContext(PositionContext);
  const user = useContext(UserContext);

  const generateMapSlots = () => {
    let slotArray = [];
    for (let i = 0; i < config.map.MAP_WIDTH * config.map.MAP_HEIGHT; i++) {
      slotArray.push(i);
    }
    return slotArray;
  };

  return (
    <MapWrapper>
      <MapImg src={getImage[config?.map.MAP_ARCHIVE_NAME]} />
      <SlotWrapper>
        {generateMapSlots().map((slot, index) => (
          <MapSlot
            key={index + 1}
            currentPos={index + 1 === pos ? true : false}
          >
            {index + 1 === pos ? (
              <img
                className="char"
                src={characters[user?.user?.TRAINER]}
                alt="Character"
              />
            ) : (
              false
            )}
          </MapSlot>
        ))}
      </SlotWrapper>
    </MapWrapper>
  );
};
export default Map;
