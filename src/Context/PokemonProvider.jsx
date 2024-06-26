import React, { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "../Hooks/useForm";

const PokemonProvider = ({ children }) => {
  const [offset, setOffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);

  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });
  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  });

  const getAllPokemons = async (limit = 50) => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const getAll = await fetch(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );
    const res = await getAll.json();

    const promises = res.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    /*   console.log(results); */
    setAllPokemons(results);
    setLoading(false);
  };

  const getGlobalPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const getAll = await fetch(
      `${baseURL}pokemon?limit=100000&offset=${offset}`
    );
    const res = await getAll.json();

    const promises = res.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    /* console.log(results); */
    setGlobalPokemons(results);
    setLoading(false);
  };

  const getPokemonById = async (id) => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const getPokemon = await fetch(`${baseURL}pokemon/${id}`);
    const res = await getPokemon.json();
    /* console.log(res); */
    return res;
  };

  const handleCheckbox = (e) => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked,
    });

    if (e.target.checked) {
      const filteredResults = globalPokemons.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setFilteredPokemons([...filteredPokemons, ...filteredResults]);
    } else {
      const filteredResults = filteredPokemons.filter(
        (pokemon) =>
          !pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setFilteredPokemons([...filteredResults]);
      /*  console.log(filteredResults); */
    }
  };

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  const onClickLoadMore = () => {
    setOffset(offset + 50);
  };

  return (
    <PokemonContext.Provider
      value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonById,
        loading,
        setLoading,
        active,
        setActive,
        handleCheckbox,
        filteredPokemons,
        onClickLoadMore,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
