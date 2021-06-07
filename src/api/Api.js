import axios from "axios";
import { trackPromise } from "react-promise-tracker";

export const service = axios.create({
  baseURL: "http://localhost:4000/graphql",
});

export const queries = (param) => {
  const request = {
    mutation: ` ${param.request}`,
    query: ` ${param.request}`,
  };
  const oi = {};
  oi[param.type] = request[param.type];
  return oi;
};

export const getConfig = () => ({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getData = async (param) => {
  trackPromise(service.post(service.baseURL, queries(param), getConfig())).then(
    (result) => result.data.data
  );
};

export const getUserInfo = async (userId, request, setFunction, area = "") => {
  const param = {
    type: "query",
    request: `{user(id: ${userId}) {${request}}}`,
  };
  trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    area: area,
  }).then((result) => setFunction(result.data.data.user));
};

export const getUserTeam = async (userId, setFunction, area = "") => {
  const teamQuery =
    " CURRENT_TEAM { TEAM { SLOT_NUMBER GENERATED_POKEMON { ID POKEMON { POKEMON_NAME DEFAULT_SPRITE POKEMON_PTYPES { TYPES { TYPENAME } } } }}}";

  const param = {
    type: "query",
    request: `{user(id: ${userId}) {${teamQuery}}}`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    area: area,
  }).then((result) => setFunction(result.data.data.user.CURRENT_TEAM.TEAM));
};

export const changePokemonFromTeam = async (
  pokemonIdBeingEquipped,
  slot,
  trainerId,
  setFunction
) => {
  const param = {
    type: "query",
    request: `mutation {
      changePokemonFromTeam(generatedPokemonIdBeingAdded: ${pokemonIdBeingEquipped}, slot: ${slot}, trainerId: ${trainerId}) {
        SLOT_NUMBER
        GENERATED_POKEMON {
          ID
          POKEMON {
            POKEMON_NAME
            DEFAULT_SPRITE
            POKEMON_PTYPES {
              TYPES {
                TYPENAME
              }
            }
          }
        }
      }
    }`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig())).then(
    (result) => setFunction(result.data.data.changePokemonFromTeam)
  );
};

export const removePokemonFromTeam = async (slot, trainerId, setFunction) => {
  const param = {
    type: "query",
    request: `mutation { removeFromTeam(slot:${slot}, trainerId: ${trainerId}){
      SLOT_NUMBER
      GENERATED_POKEMON {
        ID
        POKEMON {
          POKEMON_NAME
          DEFAULT_SPRITE
          POKEMON_PTYPES {
            TYPES {
              TYPENAME
            }
          }
        }
      }
    } }`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig())).then(
    (result) => setFunction(result.data.data.removeFromTeam)
  );
};

export const addNewPokemonToTeam = async (
  generatedPokemonId,
  trainerId,
  setFunction
) => {
  const param = {
    type: "query",
    request: `mutation {
      addNewPokeToTeam(generatedPokemonIdBeingAdded:${generatedPokemonId}, trainerId:${trainerId}) {
        SLOT_NUMBER
        GENERATED_POKEMON {
          ID
          POKEMON {
            POKEMON_NAME
            DEFAULT_SPRITE
            POKEMON_PTYPES {
              TYPES {
                TYPENAME
              }
            }
          }
        }
      }
    }`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig())).then(
    (result) => setFunction(result.data.data.addNewPokeToTeam)
  );
};

export const getMaps = async (setFunction) => {
  const param = {
    type: "query",
    request: `{ getMaps {ID MAP_ARCHIVE_NAME MAP_WIDTH MAP_HEIGHT} }`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    // area: "current-team-showoff",
    delay: 2000,
  }).then((result) => setFunction(result.data.data.getMaps));
};

export const searchPokemonInSlot = async (mapId, mapSlotId, setFunction) => {
  const param = {
    type: "query",
    request: `{ searchPokemonInSlot(mapId: ${mapId}, slotId: ${mapSlotId}) { POKEMON { POKEMON_NAME DEFAULT_SPRITE } } }`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    // area: "current-team-showoff",
    delay: 2000,
  }).then((result) => setFunction(result.data.data.searchPokemonInSlot));
};

service.interceptors.request.use((config) => {
  return config;
});

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);
