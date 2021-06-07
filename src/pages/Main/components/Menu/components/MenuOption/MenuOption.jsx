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

function MenuOption({ title, path }) {
  return (
    <Link to={path}>
      <MenuButton>{title}</MenuButton>
    </Link>
  );
}
export default MenuOption;

// <button class="menu-option">
//   <router-link class="link":to="option.path"> {{option.optionName}}</router-link>
// </button>
