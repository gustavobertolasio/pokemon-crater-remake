import { Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  catchPokemon,
  checkItemType,
  getUserTeam,
} from "../../../../../../api/Api";
import BattleControls from "./components/BattleControls/BattleControls";
import BattleField from "./components/BattleField/BattleField";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const BattleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BattleWrapper = styled.div`
  width: 1280px;
  height: 768px;
  border-radius: 5px;
  background-color: white;
`;
const Battle = ({
  onBattle,
  trainerId,
  generatedPokemon,
  setGeneratedPokemon,
}) => {
  const [team, setTeam] = useState([]);
  const [shakes, setShakes] = useState([]);
  const [isCatchingPokemon, setIsCatchingPokemon] = useState(false);

  useEffect(() => {
    getUserTeam(trainerId, setTeam);
  }, [trainerId]);

  const bagItemClickHandle = async (itemId) => {
    const itemAction = {
      POKEBALL: async () => {
        setIsCatchingPokemon(true);
        await catchPokemon(itemId, generatedPokemon.ID, trainerId, setShakes);
      },
    };
    const itemType = await checkItemType(itemId);

    itemAction[itemType]();
  };

  const handleIsCatchingPokemon = (caught) => {
    if (caught) setGeneratedPokemon(null);
    else setIsCatchingPokemon(false);
  };

  const runClickHandle = () => {
    setGeneratedPokemon(null);
  };

  return (
    <Modal open={onBattle}>
      <BattleContainer>
        {team.length && (
          <BattleWrapper>
            <BattleField
              shakes={shakes}
              isCatchingPokemon={isCatchingPokemon}
              handleIsCatchingPokemon={handleIsCatchingPokemon}
              trainerPokemon={team.length ? team[0] : null}
              wildPokemon={generatedPokemon}
            />
            <BattleControls
              isCatchingPokemon={isCatchingPokemon}
              bagItemClickHandle={bagItemClickHandle}
              runClickHandle={runClickHandle}
            />
          </BattleWrapper>
        )}
      </BattleContainer>
    </Modal>
  );
};
export default Battle;
