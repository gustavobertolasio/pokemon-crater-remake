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

export const logIn = async (username, password, setFunction) => {
  const param = {
    type: "query",
    request: `{ logIn(username: "${username}", password: "${password}") { ID     USERNAME
      TRAINER
      REGION
      AGE
      POKEDEX_CAPTURED
      POKEDEX_FOUND
      VICTORIES
      LOSSES}}`,
  };
  trackPromise(service.post(service.baseURL, queries(param), getConfig())).then(
    (result) => setFunction(result.data.data.logIn)
  );
};

export const signUp = async (data, setFunction) => {
  const param = {
    type: "query",
    request: `mutation {
      createUser(
        user: {
          age: ${data.age},
          chosenInitial: ${data.chosenInitial},
          email:"${data.email}",
          password: "${data.password}",
          region: "${data.region}",
          trainer: "${data.trainer}",
          trainerName: "${data.trainerName}",
          username: "${data.username}"
        }
      ) {
      ID 
      USERNAME
      TRAINER
      REGION
      AGE
      POKEDEX_CAPTURED
      POKEDEX_FOUND
      VICTORIES
      LOSSES
      }
    }`,
  };
  trackPromise(service.post(service.baseURL, queries(param), getConfig())).then(
    (result) => setFunction(result.data.data.signUp)
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
    " CURRENT_TEAM { TEAM { SLOT_NUMBER GENERATED_POKEMON { ID HP CURRENT_HP POKEMON_LEVEL POKEMON { POKEMON_NAME DEFAULT_SPRITE BACK_SPRITE POKEMON_PTYPES { TYPES { TYPENAME } } } }}}";

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
    request: `{ searchPokemonInSlot(mapId: ${mapId}, slotId: ${mapSlotId}) { POKEMON { ID POKEMON_NAME DEFAULT_SPRITE } } }`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    // area: "current-team-showoff",
    delay: 2000,
  }).then((result) => setFunction(result.data.data.searchPokemonInSlot));
};

export const enterMap = async (mapId, trainerId, setFunction) => {
  const param = {
    type: "query",
    request: `mutation {
      enterMap(trainerId:${trainerId},mapId:${mapId}) {
        PLAYER_SLOT
      }
    }`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    // area: "current-team-showoff",
    delay: 2000,
  }).then((result) => setFunction(result.data.data.enterMap.PLAYER_SLOT));
};

export const getUsersInMap = async (mapId, setFunction) => {
  const param = {
    type: "query",
    request: `{ 
      getUsersInMap(mapId:${mapId}){
        ID
        PLAYER_SLOT
        USER{
          USERNAME
          TRAINER
        }
      }
    }`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    // area: "current-team-showoff",
    delay: 2000,
  }).then((result) => setFunction(result.data.data.getUsersInMap));
};

export const walkInMap = async (mapId, trainerId, slotToWalk, setFunction) => {
  const param = {
    type: "query",
    request: `mutation {
      walkInMap(mapId: ${mapId}, trainerId: ${trainerId}, slotToWalk: ${slotToWalk})
    }
    `,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    // area: "current-team-showoff",
    delay: 2000,
  }).then((result) => setFunction(result.data.data.walkInMap));
};

export const getInitials = async (setFunction) => {
  const param = {
    type: "query",
    request: `{ getInitials {
      ID
      POKEMON_NAME
      DEFAULT_SPRITE
      POKEMON_PTYPES {
        TYPES {
          TYPENAME
        }
      }
    }}`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    // area: "current-team-showoff",
    delay: 2000,
  }).then((result) => setFunction(result.data.data.getInitials));
};

export const generatePokemon = async (pokemonId, mapId, setFunction) => {
  const param = {
    type: "query",
    request: `mutation {
      generatePokemon(pokemonId: ${pokemonId}, mapId: ${mapId}) {
        ID
        HP
        CURRENT_HP
        POKEMON_LEVEL
        POKEMON {
          POKEMON_NAME
          DEFAULT_SPRITE
          BACK_SPRITE      
        }
      }
    }`,
  };

  trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    // area: "current-team-showoff",
    delay: 2000,
  }).then((result) => setFunction(result.data.data.generatePokemon));
};

export const checkItemType = async (itemId) => {
  const param = {
    type: "query",
    request: `{checkItemType(itemId: ${itemId})}`,
  };

  return await trackPromise(
    service.post(service.baseURL, queries(param), getConfig())
  ).then((result) => result.data.data.checkItemType);
};

export const getItems = async (setFunction) => {
  const param = {
    type: "query",
    request: `{getAllItems {ID ITEM_NAME}}`,
  };

  return await trackPromise(
    service.post(service.baseURL, queries(param), getConfig())
  ).then((result) => setFunction(result.data.data.getAllItems));
};

export const catchPokemon = async (
  itemId,
  generatedPokemon,
  trainerId,
  setFunction
) => {
  const param = {
    type: "query",
    request: `mutation {
      catchPokemon(generatedPokemonId: ${generatedPokemon}, pokeballItemId: ${itemId}, trainerId: ${trainerId}) 
    }`,
  };

  await trackPromise(service.post(service.baseURL, queries(param), getConfig())).then(
    (result) => setFunction(result.data.data.catchPokemon)
  );
};

export const buyItem = async (itemId, userId) => {
  const param = {
    type: "query",
    request: `mutation {
      buyItem(userId: ${userId}, itemId: ${itemId}) 
    }`,
  };

  return trackPromise(service.post(service.baseURL, queries(param), getConfig()), {
    delay: 2000,
  })
}

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
