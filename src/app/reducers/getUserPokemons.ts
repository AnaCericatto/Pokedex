import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, query, where } from "firebase/firestore";
import { RootState } from "../store";
import { userPokemonType } from "../../utils/Types";
import { images, defaultImages } from "../../utils/getPokemonImages";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { pokemonTypes } from "../../utils/getPokemonTypes";
export const getUserPokemons = createAsyncThunk(
  "pokemon/userList",
  async (args, { getState }) => {
    try {
      const {
        app: { userInfo },
      } = getState() as RootState;
      if (!userInfo?.email) {
        return;
      }
      const firestoreQuery = query(
        pokemonListRef,
        where("email", "==", userInfo?.email)
      );
      const fetchedPokemons = await getDocs(firestoreQuery);
      if (fetchedPokemons.docs.length) {
        const userPokemons: userPokemonType[] = [];
        fetchedPokemons.forEach(async (pokemon) => {
          const pokemons = await pokemon.data().pokemon;
          // @ts-ignore
          let image = images[pokemons.id];
          if (!image) {
            // @ts-ignore
            image = defaultImages[pokemons.id];
          }
          const types = pokemons.types.map((name: string) => ({
            // @ts-ignore
            [name]: pokemonTypes[name],
          }));

          userPokemons.push({
            ...pokemons,
            firebaseId: pokemon.id,
            image,
            types,
          });
        });
        return userPokemons;
      }
      return [];
    } catch (err) {
      console.log(err);
    }
  }
);
