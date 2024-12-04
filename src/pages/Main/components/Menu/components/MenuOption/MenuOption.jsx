import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuButton = styled.button`
  height: 100%;
  font-size: 16px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0 16px;

  &.--active {
    background-color: #0066ff;
    cursor: default;
    pointer-events: none;
  }

  :hover {
    animation-name: backgroundFade;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes backgroundFade {
    to {
      background-color: #0066ff;
    }
  }
`;

function MenuOption({ title, path, active }) {
  return (
    <Link
      to={path}
      onClick={(e) => (active ? e.preventDefault() : "")}
    >
      <MenuButton className={active ? "--active" : ""}>{title}</MenuButton>
    </Link>
  );
}
export default MenuOption;
