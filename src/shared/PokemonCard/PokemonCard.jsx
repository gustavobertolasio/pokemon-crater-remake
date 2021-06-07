import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import Slot from "../../shared/Slot/Slot";
import { DefaultPokemonCard } from "../../UI/index";
import TypesList from "../TypesList/TypesList";
import Cancel from "../../assets/controls/cancel.svg";

const Card = styled(DefaultPokemonCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  width: 120px;
  padding-bottom: 4px;
  z-index: 99;

  img {
    max-width: 72px;
    max-height: 72px;
  }

  .pokemon-name {
    text-transform: capitalize;
  }
`;

const Remove = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 15px;
  width: 100%;
`;

const RemoveButton = styled.button`
  width: 15px;
  height: 15px;
  margin-right: 12px;
  border-radius: 33px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  img {
    width: inherit;
    height: inherit;
    filter: invert(51%) sepia(10%) saturate(12%) hue-rotate(335deg)
      brightness(96%) contrast(86%);
  }
`;

const PokemonCard = ({
  slot,
  showTypeCards,
  showPokemonName,
  filter = "",
  addPokemonToTeam,
  droppable,
  changePokes,
  canRemoveFromTeam = true,
  removePokeFromTeam,
}) => {
  let item = { generatedPokemonId: slot?.GENERATED_POKEMON?.ID };

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "card",
    item: item,
  }));

  const [deleteToggle, setDeleteToggle] = useState(false);

  const handleDeleteToggle = () => {
    if (canRemoveFromTeam) {
      setDeleteToggle(!deleteToggle);
    }
  };

  const removeFromTeam = () => {
    removePokeFromTeam(slot?.SLOT_NUMBER);
  };

  const hide = () => {
    if (slot && slot?.GENERATED_POKEMON)
      return slot?.GENERATED_POKEMON?.POKEMON?.POKEMON_NAME.includes(filter);
    return true;
  };

  const callback = (pokemonIdBeingEquipped) => {
    changePokes(pokemonIdBeingEquipped, slot?.SLOT_NUMBER);
  };

  return collected.isDragging ? (
    <Card ref={dragPreview} />
  ) : droppable ? (
    hide() && (
      <Slot
        droppable={droppable}
        callback={callback}
        add={!slot.GENERATED_POKEMON}
      >
        {slot?.GENERATED_POKEMON && (
          <Card onClick={() => handleDeleteToggle()}>
            <Remove>
              {deleteToggle && (
                <RemoveButton>
                  <img onClick={() => removeFromTeam()} src={Cancel} alt="X" />
                </RemoveButton>
              )}
            </Remove>
            {showPokemonName && slot?.GENERATED_POKEMON?.ID && (
              <h6>#{slot?.GENERATED_POKEMON?.ID}</h6>
            )}
            <img
              src={slot?.GENERATED_POKEMON?.POKEMON?.DEFAULT_SPRITE}
              alt={slot?.GENERATED_POKEMON?.POKEMON?.POKEMON_NAME}
            />
            {showPokemonName && (
              <h6 className="pokemon-name">
                {slot?.GENERATED_POKEMON?.POKEMON?.POKEMON_NAME}
              </h6>
            )}
            {showTypeCards &&
            slot?.GENERATED_POKEMON?.POKEMON?.POKEMON_PTYPES ? (
              <TypesList
                pokemonTypes={slot?.GENERATED_POKEMON?.POKEMON?.POKEMON_PTYPES}
              ></TypesList>
            ) : (
              false
            )}
          </Card>
        )}
      </Slot>
    )
  ) : (
    hide() &&
    slot && (
      <Card ref={drag} {...collected}>
        {showPokemonName && slot?.GENERATED_POKEMON?.ID && (
          <h6>#{slot?.GENERATED_POKEMON?.ID}</h6>
        )}
        <img
          src={slot?.GENERATED_POKEMON?.POKEMON?.DEFAULT_SPRITE}
          alt={slot?.GENERATED_POKEMON?.POKEMON?.POKEMON_NAME}
        />
        {showPokemonName && (
          <h6 className="pokemon-name">
            {slot?.GENERATED_POKEMON?.POKEMON?.POKEMON_NAME}
          </h6>
        )}
        {showTypeCards && slot?.GENERATED_POKEMON?.POKEMON?.POKEMON_PTYPES ? (
          <TypesList
            pokemonTypes={slot?.GENERATED_POKEMON?.POKEMON?.POKEMON_PTYPES}
          ></TypesList>
        ) : (
          false
        )}
      </Card>
    )
  );
};
export default PokemonCard;
