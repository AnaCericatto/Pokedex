import React from "react";
import { IoGitCompare } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { pokemonTypeInterface, userPokemonType } from "../utils/Types";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCompare, setCurrentPokemon } from "../app/slices/PokemonSlice";
import { setPokemonTab, setToast } from "../app/slices/AppSlice";
import { addPokemonToList } from "../app/reducers/addPokemonToList";
import { removePokemon } from "../app/reducers/removePokemonFromUserList";
import { pokemonTabs } from "../utils/Constants";

function PokemonCardGrid({ pokemons }: { pokemons: userPokemonType[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispach = useAppDispatch();

  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons?.map((data: userPokemonType) => {
            return (
              <div className="pokemon-card" key={data.id}>
                <div className="pokemon-card-list">
                  {location.pathname.includes("/pokemon") ||
                  location.pathname.includes("/search") ? (
                    <FaPlus
                      className="plus"
                      onClick={() => dispach(addPokemonToList(data))}
                    />
                  ) : (
                    <FaTrash
                      className="trash"
                      onClick={() => {
                        dispach(removePokemon({ id: data.firebaseId! }));
                        dispach(setToast("Pokemon removed successfully"));
                      }}
                    />
                  )}
                </div>
                <div className="pokemon-card-compare">
                  <IoGitCompare
                    onClick={() => {
                      dispach(addToCompare(data));
                      dispach(
                        setToast(
                          `${data.name.toUpperCase()} has been adeed to Compare Queue.`
                        )
                      );
                    }}
                  />
                </div>
                <h3 className="pokemon-card-title">{data.name}</h3>
                <img
                  src={data.image}
                  alt="pokemon sprite"
                  className="pokemon-card-image"
                  loading="lazy"
                  onClick={() => {
                    dispach(setPokemonTab(pokemonTabs.description));
                    dispach(setCurrentPokemon(undefined));
                    navigate(`/pokemon/${data.id}`);
                  }}
                />
                <div className="pokemon-card-types">
                  {data.types.map(
                    (type: pokemonTypeInterface, index: number) => {
                      const keys = Object.keys(type);
                      return (
                        <div className="pokemon-card-types-type" key={index}>
                          <img
                            src={type[keys[0]].image}
                            alt="pokemon type"
                            className="pokemon-card-types-type-image"
                            loading="lazy"
                          />
                          <h6 className="pokemon-card-types-type-text">
                            {keys[0]}
                          </h6>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PokemonCardGrid;
