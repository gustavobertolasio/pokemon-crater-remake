import React from "react";
import styled from "styled-components";
import West from "../../../../../../../../assets/controls/west.svg";
import North from "../../../../../../../../assets/controls/north.svg";
import East from "../../../../../../../../assets/controls/east.svg";
import South from "../../../../../../../../assets/controls/south.svg";

const ControlsWrapper = styled.div`
  display: flex;
  width: 180px;
  height: 180px;
`;

const SideArea = styled.div`
  display: flex;
  width: 60px;
  height: 180px;
  align-items: center;
`;

const CenterArea = styled(SideArea)`
  flex-direction: column;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100%;
  height: 60px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 33px;

  .img {
    filter: invert(51%) sepia(10%) saturate(12%) hue-rotate(335deg)
      brightness(96%) contrast(86%);
  }

  :hover {
    background: blue;
  }
`;

const Game = ({ walk }) => {
  return (
    <ControlsWrapper>
      <SideArea>
        <Button onClick={() => walk("left")}>
          <img className="img" src={West} alt="Left" />
        </Button>
      </SideArea>
      <CenterArea>
        <Button onClick={() => walk("up")}>
          <img className="img" src={North} alt="Up" />
        </Button>
        <Button onClick={() => walk("down")}>
          <img className="img" src={South} alt="Down" />
        </Button>
      </CenterArea>
      <SideArea>
        <Button onClick={() => walk("right")}>
          <img className="img" src={East} alt="Right" />
        </Button>
      </SideArea>
    </ControlsWrapper>
  );
};
export default Game;
