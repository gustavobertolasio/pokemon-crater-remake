import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Bag from "../../../InfoArea/components/Bag/Bag";

const BattleControlsWrapper = styled.div`
  width: 1280px;
  height: 192px;
  background-color: rgb(40, 48, 48);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoWrapper = styled.div`
  background-color: rgb(200, 168, 72);
  width: 928px;
  height: 176px;
  border-radius: 5px 0 0 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 8px;
`;

const Info = styled.div`
  background-color: rgb(40, 80, 104);
  width: 98.7%;
  height: 87%;
  border: 4px solid rgb(224, 216, 224);
  border-right: none;
  border-radius: 5px 0 0 5px;
`;

const OptionsWrapper = styled.div`
  background-color: rgb(40, 80, 104);
  width: 312px;
  height: 176px;
`;

const Options = styled.div`
  background-color: rgb(248, 248, 248);
  border: 8px solid;
  border-image: linear-gradient(
      to bottom,
      rgb(136, 136, 200),
      rgb(112, 104, 128)
    )
    1;
  width: 304px;
  height: 160px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const Option = styled.div`
  color: black;
  width: 100px;
  height: 58px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 5px;
  padding-left: 8px;
  cursor: pointer;

  :hover {
    border: 1px solid gray;
  }
`;

const BattleControls = ({
  bagItemClickHandle,
  runClickHandle,
  isCatchingPokemon,
}) => {
  const options = {
    FIGHT: {
      click: () => null,
    },
    BAG: {
      click: (event) => {
        handleBagClick(event);
      },
    },
    POKEMON: {
      click: () => null,
    },
    RUN: {
      click: () => {
        runClickHandle();
      },
    },
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleItemClick = (itemId) => {
    handleClose();
    bagItemClickHandle(itemId);
  };

  const handleBagClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BattleControlsWrapper>
      <InfoWrapper>
        <Info></Info>
      </InfoWrapper>
      <OptionsWrapper>
        {!isCatchingPokemon && (
          <Options>
            {Object.keys(options).map((action) => (
              <Option key={`${action}-button`} onClick={options[action].click}>
                {action}
              </Option>
            ))}
            <Bag
              backPackAsPopover
              backpackAnchor={anchorEl}
              popoverClose={handleClose}
              itemClikedCallback={handleItemClick}
            />
          </Options>
        )}
      </OptionsWrapper>
    </BattleControlsWrapper>
  );
};
export default BattleControls;
