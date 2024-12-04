import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DefaultPage } from "../../UI";
import CharacterShowcase from "./components/CharacterShowcase/CharacterShowcase";
import Friends from "./components/Friends/Friends";
import CurrentPokemonShowcase from "./components/CurrentPokemonShowcase/CurrentPokemonShowcase";
import MyPokemons from "./components/MyPokemons/MyPokemons";
import UserContext from "../../contexts/UserContext";
import {
  getUserInfo,
  changePokemonFromTeam,
  removePokemonFromTeam,
  getUserTeam,
  addNewPokemonToTeam,
} from "../../api/Api";
import TeamContext from "../../contexts/TeamContext";
import MyPokemonsContext from "../../contexts/MyPokemonsContext";
import { colors } from "../../UI/constants";
import DndWrapper from "../../common/DndWrapper"

const HomeWrapper = styled(DefaultPage)``;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 87vh;

  :first-of-type {
    margin-right: 48px;
  }

  :last-of-type {
    padding-left: 47px;
    border-left: 1px solid ${colors.complementary_blue_4};
  }
`;

const myPokemonsQuery =
  "TRAINER_POKEMONS {GENERATED_POKEMON{ ID POKEMON {ID POKEMON_NAME DEFAULT_SPRITE POKEMON_PTYPES {TYPES {TYPENAME}}}}}";

const Home = () => {
  const { user } = useContext(UserContext);
  const [team, setTeam] = useState([]);
  const [myPokemons, setMyPokemons] = useState(null);

  const getMyPokemons = async () =>
    getUserInfo(user.ID, myPokemonsQuery, setMyPokemons);

  useEffect(() => {
    if (user) {
      getUserTeam(user.ID, setTeam);
      getUserInfo(user.ID, myPokemonsQuery, setMyPokemons);
    }
  }, [user]);

  const homeChangePokes = async ({ generatedPokemonId }, slot) => {
    await changePokemonFromTeam(generatedPokemonId, slot, user.ID, setTeam);

    setTimeout(() => {
      getMyPokemons();
    }, 100);
  };

  const homeAddPoke = async ({ generatedPokemonId }, slot) => {
    await addNewPokemonToTeam(generatedPokemonId, user.ID, setTeam);

    setTimeout(() => {
      getMyPokemons();
    }, 100);
  };

  const homeRemovePokeFromTeam = async (slot) => {
    await removePokemonFromTeam(slot, user.ID, setTeam);

    setTimeout(() => {
      getMyPokemons();
    }, 200);
  };

  return (
    <HomeWrapper>
      <div className="container">
        <InfoWrapper>
          <InfoColumn>
            <CharacterShowcase character={user}></CharacterShowcase>
            <Friends friendList={user?.friends}></Friends>
          </InfoColumn>
          <InfoColumn>
              <TeamContext.Provider value={team}>
                <CurrentPokemonShowcase
                  homeChangePokes={homeChangePokes}
                  homeRemovePokeFromTeam={homeRemovePokeFromTeam}
                  homeAddPoke={homeAddPoke}
                ></CurrentPokemonShowcase>
              </TeamContext.Provider>
              <MyPokemonsContext.Provider value={myPokemons}>
                <MyPokemons></MyPokemons>
              </MyPokemonsContext.Provider>
          </InfoColumn>
        </InfoWrapper>
      </div>
    </HomeWrapper>
  );
};
export default Home;
