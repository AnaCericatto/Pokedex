import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  pokemonStatType,
  pokemonTypeInterface,
  userPokemonType,
} from "../../utils/Types";
import { RootState } from "../store";
import { setToast } from "../slices/AppSlice";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { getUserPokemons } from "./getUserPokemons";

export const addPokemonToList = createAsyncThunk(
  "pokemon/addPokemon",
  async (
    pokemon: {
      id: number;
      name: string;
      types: pokemonTypeInterface[] | string[];
      stats?: pokemonStatType[];
    },
    { getState, dispatch }
  ) => {
    try {
      const {
        app: { userInfo },
        pokemon: { userPokemons },
      } = getState() as RootState;
      if (!userInfo?.email) {
        return dispatch(
          setToast("Please login in order to add pokemon to your collection")
        );
      }
      const index = userPokemons.findIndex((userPokemons: userPokemonType) => {
        return userPokemons.name === pokemon.name;
      });
      if (index === -1) {
        let types: string[] = [];
        if (!pokemon.stats) {
          pokemon.types.forEach((type: any) =>
            types.push(Object.keys(type).toString())
          );
        } else {
          types = pokemon.types as string[];
        }

        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
          email: userInfo.email,
        });
        await dispatch(getUserPokemons());
        return dispatch(setToast(`${pokemon.name} added to your collection`));
      } else {
        return dispatch(
          setToast(`${pokemon.name} alredy part of your collection`)
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
);
