import React from "react";
import styled from "styled-components";
import { DefaultHomeCard } from "../../../../UI/index";
import Friend from "./components/Friend/Friend";
import { useTranslation } from "react-i18next";

const FriendsWrapper = styled(DefaultHomeCard)`
  display: flex;
  flex-direction: column;
  width: 288px;
  padding: 16px 16px 24px 16px;

  .title-center {
    text-align: center;
  }
`;

const Friends = ({ friendList }) => {
  const { t } = useTranslation();

  return (
    <FriendsWrapper className="mt-16">
      <h4 className="title-center">{t("pages.home.friends")} </h4>
      {friendList?.map((friendId, index) => (
        <Friend key={index} friendId={friendId}></Friend>
      ))}
    </FriendsWrapper>
  );
};
export default Friends;
