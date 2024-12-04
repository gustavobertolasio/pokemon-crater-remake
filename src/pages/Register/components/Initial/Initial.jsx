import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FormBuilder,
  Validators
} from "react-reactive-form";
import styled from "styled-components";
import { getInitials } from "../../../../api/Api";
import DndWrapper from "../../../../common/DndWrapper";
import PokemonCard from "../../../../shared/PokemonCard/PokemonCard";
import { DefaultInput } from "../../../../UI";

const InitialDataWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  width: 450px;

  .line {
    display: flex;
    align-items: center;
    font-size: 14px;

    .input {
      width: 250px;
      margin-left: 16px;
    }
    .input-label {
      max-width: 100px;
      text-align: center;
    }
  }

  .line-area {
    height: 50px;
    justify-content: flex-end;
  }
  .error {
    color: red;
    width: 230px;
  }
`;

const Input = styled(DefaultInput)`
  width: 55%;
`;

const InitialControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 150px;

  .input-label {
    width: 100%;
    text-align: center;
  }

  .initials-line {
    display: flex;
    flex-direction: column;
    width: 100%;

    .initials-tochoose {
      display: flex;
      height: 150px;
      overflow-x: auto;

      .cards {
        margin: 0;

        &.-reduce-opacity {
          opacity: 0.1;
        }
      }

      ::-webkit-scrollbar {
        height: 2px;
      }

      ::-webkit-scrollbar-track {
        background-color: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 10px;
      }
    }
  }
`;

const Initial = ({ proceed, setData }) => {
  const trainerDataForm = FormBuilder.group({
    chosenInitial: ["", Validators.required],
  });

  const [filter, setFilter] = useState("");

  const [initials, setInitials] = useState([]);
  const [chosen, setChosen] = useState(0);

  let formSubscribe = trainerDataForm.valueChanges.subscribe((value) => {
    setChosen(value.chosenInitial);
  });

  useEffect(() => {
    getInitials(setInitials);
    return () => {
      if (formSubscribe) {
        formSubscribe.unsubscribe();
      }
    };
  }, [formSubscribe]);

  const { t } = useTranslation();

  const setSelectedInitial = (pokemonId) => {
    trainerDataForm.get("chosenInitial").setValue(+pokemonId);
    setData({ chosenInitial: trainerDataForm.get("chosenInitial").value });
    proceed(trainerDataForm.valid);
  };

  return (
    <InitialDataWrapper id="initial">
      <DndWrapper id="initial">
        <InitialControlWrapper>
          <div className="initials-line">
            <h2 className="input-label">Choose your initial</h2>
            <Input
              className="mt-16"
              onChange={($event) => setFilter($event.target.value)}
              placeholder={t("pages.home.my-pokemons-filter")}
            />
            <div className="initials-tochoose mt-16">
              {initials?.map((initial) => (
                <div className={`cards`}>
                  <PokemonCard
                    key={`pokemon-${initial.ID}`}
                    droppable={false}
                    showPokemonName={true}
                    showTypeCards={true}
                    filter={filter}
                    slot={{ GENERATED_POKEMON: { POKEMON: initial } }}
                    canRemoveFromTeam={false}
                    sendPokemon={setSelectedInitial}
                    hasHover={true}
                    selected={chosen}
                  />
                </div>
              ))}
            </div>
          </div>
        </InitialControlWrapper>
      </DndWrapper>
    </InitialDataWrapper>
  );
};
export default Initial;
