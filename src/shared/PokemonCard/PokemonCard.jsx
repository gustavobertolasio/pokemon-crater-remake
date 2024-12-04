import React, { useState } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import Cancel from "../../assets/controls/cancel.svg";
import Slot from "../../shared/Slot/Slot";
import { DefaultPokemonCard } from "../../UI/index";
import TypesList from "../TypesList/TypesList";

const Card = styled(DefaultPokemonCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  width: 120px;
  padding-bottom: 16px;
  z-index: 99;
  border-radius: 5px;

  img {
    max-width: 72px;
    max-height: 72px;
  }

  .pokemon-name {
    text-transform: capitalize;
  }

  &.-hoverable {
    animation-name: pokemonCardSelection;
    cursor: pointer;
    :hover {
      animation-duration: 5s;
      animation-fill-mode: forwards;
    }
  }

  &.-reduce-opacity {
    opacity: 0.3;
  }

  @keyframes pokemonCardSelection {
    from {
      background: none;
    }
    to {
      background: rgb(212, 212, 212);
      background: radial-gradient(
        circle,
        rgba(212, 212, 212, 0.8071603641456583) 0%,
        rgba(212, 212, 212, 0.09007352941176472) 50%,
        rgba(212, 212, 212, 0.8715861344537815) 100%
      );
    }
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
  droppable,
  changePokes,
  canRemoveFromTeam = true,
  removePokeFromTeam,
  sendPokemon = false,
  hasHover = false,
  selected,
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

  const send = () => {
    if (sendPokemon) {
      sendPokemon(slot?.GENERATED_POKEMON?.POKEMON?.ID);
    }
  };

  const hide = () => {
    if (slot && slot?.GENERATED_POKEMON)
      return slot?.GENERATED_POKEMON?.POKEMON?.POKEMON_NAME.includes(
        filter.toLowerCase()
      );
    return true;
  };

  const reduceOpacity = () => {
    if (selected) return +slot?.GENERATED_POKEMON?.POKEMON?.ID !== +selected;
    return false;
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
      <Card
        className={`${hasHover ? "-hoverable " : " "}  ${
          reduceOpacity() ? "-reduce-opacity" : ""
        }`}
        onClick={() => send()}
        ref={drag}
        {...collected}
      >
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
