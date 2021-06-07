import React from "react";
import styled from "styled-components";

const DefaultLink = styled.a`
  font-size: 14px;
  color: cyan;
  text-decoration: none;
`;

const Link = ({linkText, href}) => {
  return <DefaultLink href={href}>{linkText}</DefaultLink>;
};
export default Link;
