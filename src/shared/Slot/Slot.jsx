import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import Plus from "../../assets/controls/plus.svg";

const SlotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 4px 0;
  height: fit-content;
  width: fit-content;

  &.-adding {
    border: 1px solid gray;
    height: 130px;
    width: 118px;
    background-color: rgba(0, 0, 0, 0.2);

    img {
      width: 25px;
      height: 25px;
      filter: invert(51%) sepia(10%) saturate(12%) hue-rotate(335deg)
        brightness(96%) contrast(86%);
    }
  }
`;
const Slot = ({ children, droppable = false, callback, add }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "card",
    canDrop: () => droppable,
    drop: (obj) => callback(obj),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <SlotWrapper
      style={
        !isOver ? {} : { backgroundColor: isOver ? "#90EE90 " : "transparent" }
      }
      className={add ? "-adding " : ""}
      ref={drop}
    >
      {add ? <img src={Plus} alt="Add" /> : children}
    </SlotWrapper>
  );
};
export default Slot;
