import React from "react";
import styled from "styled-components";
import { colors } from "../../UI/constants";

const DefaultLink = styled.a`
  font-size: 14px;
  color: ${colors.default_primary_dark_blue};
  text-decoration: none;
`;

const Link = ({linkText, href}) => {
  return <DefaultLink href={href}>{linkText}</DefaultLink>;
};
export default Link;
