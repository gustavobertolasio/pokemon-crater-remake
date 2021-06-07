import React from "react";
import styled from "styled-components";
import CryingPikachu from "../../assets/full_crying_pikachu.png";
import { DefaultPage } from "../../UI";
import { useTranslation } from "react-i18next";

const NotFoundWrapper = styled(DefaultPage)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 438px;
  width: 400px;
`;

const Subtitle = styled.h2`
  margin-top: 32px;
`;

function PageNotFound() {
  const { t } = useTranslation();

  return (
    <NotFoundWrapper>
      <Image src={CryingPikachu}></Image>
      <Subtitle>{t("pages.404")}</Subtitle>
    </NotFoundWrapper>
  );
}
export default PageNotFound;
