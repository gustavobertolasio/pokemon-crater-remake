import React from "react";
import styled from "styled-components";

const InputWrapper = styled.input`
  width: 100%;
  height: fit-content;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 14px;
  padding: 8px 4px;
`;

const DefaultInput = ({placeholder, onChange}) => {
  return <InputWrapper onChange={($event) => onChange($event.target.value)} placeholder={placeholder}/>;
};
export default DefaultInput;
