import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PokemonLogo from "../../../../assets/pokemon_logo.png";
import MenuOption from "./components/MenuOption/MenuOption";
import { MenuOptions, onlyAuth } from "../../../../menu-options";
import Button from "../../../../shared/Button/Button";
import { Link, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import UserContext from "../../../../contexts/UserContext";
import { useLocation } from "react-router-dom";
import { colors } from "../../../../UI/constants";

const MenuWrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: ${colors.default_blue};
`;

const MenuContent = styled.div`
  display: flex;
  height: 100%;
`;

const Logo = styled.img`
  width: 95px;
  margin: 16px 32px 16px 32px;
`;

const Navbar = styled.div`
  display: flex;
  width: 1100px;
`;

const LogButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  .sign-in {
    margin-right: 8px;
  }
`;

function Menu() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isAuthenticatedOption = (option) => {
    if (option.onlyAuthenticated) {
      return !!user;
    }
    return true;
  };

  return (
    <MenuWrapper>
      <MenuContent className="container">
        <Logo src={PokemonLogo} alt="Logo" />
        <Navbar>
          {MenuOptions.map(
            (option, index) =>
              option.menuItem &&
              isAuthenticatedOption(option) && (
                <MenuOption
                  key={index}
                  title={t(`menu.${option.name}`)}
                  path={option.path}
                  active={location.pathname === option.path}
                />
              )
          )}
        </Navbar>
        <LogButtonsWrapper>
          {!user && (
            <>
              <Link to="/register" className="sign-in">
                <Button
                  buttonTitle={t(`menu.buttons.sign-in`)}
                  isPrimary={true}
                />
              </Link>
              <Link to="/login">
                <Button
                  buttonTitle={t(`menu.buttons.login`)}
                  isPrimary={false}
                />
              </Link>
            </>
          )}
        </LogButtonsWrapper>
      </MenuContent>
    </MenuWrapper>
  );
}
export default Menu;
