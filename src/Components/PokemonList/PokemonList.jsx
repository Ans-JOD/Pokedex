import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = ({ searchedPokemon, setSearchedPokemon }) => {
  const [loading, setLoading] = useState(true);
  const [pokemonList, SetPokemonList] = useState([]);
  const [pokedexURL, setPodedexURL] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [prevURL, setPrevULR] = useState("");
  const [nextURL, setNextURL] = useState("");

  async function PokemonList() {
    setLoading(true);
    const response = await axios.get(pokedexURL);
    const pokemonResult = response.data.results;
    setNextURL(response.data.next);
    console.log(response.data.next);
    setPrevULR(response.data.previous);
    console.log(response.data.previous);
    const pokemonResultPromise = pokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await Promise.all(pokemonResultPromise);
    const res = Array.isArray(pokemonData)
      ? pokemonData.map((pokeData) => {
          const pokemon = pokeData.data;

          return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other
              ? pokemon.sprites.other.dream_world.front_default
              : pokemon.sprites.front_shiny,
            types: pokemon.types,
          };
        })
      : [];
    SetPokemonList(res);
    console.log(res);
    setLoading(false);
  }

  useEffect(() => {
    if (!searchedPokemon) PokemonList();
  }, [pokedexURL, searchedPokemon]);

  return (
    <div className="pokemon-list">
      {searchedPokemon ? (
        <>
          <div className="heading-with-button">
            <button className="btn" onClick={() => setSearchedPokemon(null)}>
              Back to List
            </button>
            <span className="list-heading">Search Result</span>
          </div>
          <div className="pokemon-wrapper">
            <Pokemon
              name={searchedPokemon.name}
              img={searchedPokemon.image}
              key={searchedPokemon.id}
            />
          </div>
        </>
      ) : (
        <>
          <div className="heading-with-button">
            <button
              className="btn"
              disabled={prevURL == null}
              onClick={() => setPodedexURL(prevURL)}
            >
              Prev
            </button>
            <span className="list-heading">List of pokemons</span>
            <button
              className="btn"
              disabled={nextURL == null}
              onClick={() => setPodedexURL(nextURL)}
            >
              Next
            </button>
          </div>

          <div className="pokemon-wrapper">
            {loading
              ? <div style={{color: 'black',width:'100vw'}}>Loading...</div>
              : pokemonList.map((pokemon) => (
                  <Pokemon
                    name={pokemon.name}
                    img={pokemon.image}
                    key={pokemon.id}
                    id={pokemon.id}
                  />
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonList;
