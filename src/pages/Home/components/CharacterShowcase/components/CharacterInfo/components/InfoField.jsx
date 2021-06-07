import React from "react";
import styled from "styled-components";

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 35px;
  width: fit-content;
  padding: 0 8px;
  margin-right: 16px;
  font-size: 14px;
`;

function InfoField({ title, value }) {
  return (
    <FieldWrapper>
      <b>{title}</b>
      {value}
    </FieldWrapper>
  );
}
export default InfoField;
