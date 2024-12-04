import React from "react";
import styled from "styled-components";

const getBarColor = (lifePercentage) => {
  const lifebarColors = {
    low: "red",
    half: "yellow",
    full: "lightgreen",
  };

  if (lifePercentage > 50) {
    return lifebarColors.full;
  }

  if (lifePercentage > 20) {
    return lifebarColors.half;
  }
  return lifebarColors.low;
};

const LifebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 18px;
  border-radius: 25px;
  border: 2px solid white;
  background-color: black;
`;

const LifebarGreen = styled.div`
  width: ${(props) => (props.actualHp / props.maxHp) * 100}%;
  height: 100%;
  max-height: 18px;
  border-radius: 25px;
  background-color: ${(props) =>
    getBarColor((props.actualHp / props.maxHp) * 100)};
  transition: background-color 1s, width 1s;
`;

const Lifebar = ({ maxHp, actualHp }) => {
  return (
    <LifebarWrapper>
      <LifebarGreen maxHp={maxHp} actualHp={actualHp} />
    </LifebarWrapper>
  );
};
export default Lifebar;
