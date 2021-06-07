import React from "react";
import styled from "styled-components";
import PokemonLogo from "../../../../assets/pokemon_logo.png";
import MenuOption from "./components/MenuOption/MenuOption";
import MenuOptions from "../../../../menu-options";
import Button from "../../../../shared/Button/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MenuWrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #0084ff;
`;

const MenuContent = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const Logo = styled.img`
  width: 95px;
  margin: 5px 45px 5px 0;
`;

const Navbar = styled.div`
  display: flex;
  width: 800px;
`;

const LogButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 200px;

  .sign-in {
    margin-right: 8px;
  }
`;

function Menu() {
  const { t } = useTranslation();

  return (
    <MenuWrapper>
      <MenuContent className="container">
        <Logo src={PokemonLogo} alt="Logo" />
        <Navbar>
          {MenuOptions.map((option, index) =>
            option.menuItem ? (
              <MenuOption
                key={index}
                title={t(`menu.${option.name}`)}
                path={option.path}
              ></MenuOption>
            ) : (
              false
            )
          )}
        </Navbar>
        <LogButtonsWrapper>
          <Link to="/login" className="sign-in">
            <Button buttonTitle={t(`menu.buttons.sign-in`)} isPrimary={true} />
          </Link>
          <Link to="/login">
            <Button buttonTitle={t(`menu.buttons.login`)} isPrimary={false} />
          </Link>
        </LogButtonsWrapper>
      </MenuContent>
    </MenuWrapper>
  );
}
export default Menu;
