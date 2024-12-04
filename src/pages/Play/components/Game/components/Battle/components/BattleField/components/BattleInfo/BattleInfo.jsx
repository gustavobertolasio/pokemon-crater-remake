import React from "react";
import styled from "styled-components";
import Lifebar from "../../../../../../../../../../shared/Lifebar/Lifebar";

const BattleInfoWrapper = styled.div`
  width: 416px;
  height: 134px;
  border-radius: 15px 0 15px 0;
  background-color: rgb(80, 104, 96);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BattleInfoBackground = styled.div`
  width: 404px;
  height: 122px;
  border-radius: 15px 0 15px 0;
  border: 3px solid rgb(32, 56, 0);
  background-color: rgb(248, 248, 216);
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  color: black;
  font-size: 18px;

  .name {
    padding-left: 24px;
    width: 70%;
    text-transform: uppercase;
    color: black;

  }

  .level {
    color: black;
  }

  &.bottom-info {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const BattleInfoLifebarWrapper = styled.div`
  color: white;
  display: flex;
  align-items: center;
  width: 300px;
  height: 26px;
  border-radius: 25px;
  margin: 0 0 0 84px;
  background-color: rgb(80, 104, 96);
  padding: 0 2px;

  .hp {
    margin: 0 8px;
  }
`;

const HpAndStatus = styled.div`
  display: flex;
  width: 100%;

  .status {
    width: 80%;
    color: black;
    padding-left: 24px;
  }
  .hptext {
    width: 20%;
    color: black;
  }
`;

const BattleInfo = ({
  pokemonName,
  pokemonLevel,
  maxHp,
  actualHP,
  isUpperInfo,
}) => {
  return (
    <BattleInfoWrapper>
      <BattleInfoBackground>
        <Row>
          <span className="name">{pokemonName}</span>
          <span className="level">Lv. {pokemonLevel}</span>
        </Row>
        <Row className="bottom-info">
          <BattleInfoLifebarWrapper>
            <span className="hp">HP</span>
            <Lifebar maxHp={maxHp} actualHp={actualHP} />
          </BattleInfoLifebarWrapper>

          <HpAndStatus>
            <div className="status">Burnt</div>
            {!isUpperInfo && (
              <div className="hptext">{`${actualHP}/${maxHp}`}</div>
            )}
          </HpAndStatus>
        </Row>
      </BattleInfoBackground>
    </BattleInfoWrapper>
  );
};
export default BattleInfo;
