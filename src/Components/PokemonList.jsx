import React, { useContext } from "react";
import { PokemonContext } from "../Context/PokemonContext";
import CardPokemon from "./CardPokemon";
import Loading from "./Loading";

const PokemonList = () => {
  const { allPokemons, filteredPokemons, loading } = useContext(PokemonContext);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="card-list-pokemon container">
          {filteredPokemons.length ? (
            <>
              {filteredPokemons.map((pokemon) => (
                <CardPokemon pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          ) : (
            <>
              {allPokemons.map((pokemon) => (
                <CardPokemon pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PokemonList;
