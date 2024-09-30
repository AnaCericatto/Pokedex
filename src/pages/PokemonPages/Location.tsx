import React from "react";
import { useAppSelector } from "../../app/hooks";

function Location() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    <div className="pokemon-location">
      <ul className="pokemon-location-list">
        {pokemonData?.encounters.map((encounter: string) => (
          <li key={encounter} className="pokemon-location-li">
            {encounter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Location;
