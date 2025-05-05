import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
    const [loading, setLoading] = useState(true);
    const [pokemonList, SetPokemonList] = useState([]);

    async function PokemonList(){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonResult = response.data.results;
        const pokemonResultPromise = pokemonResult.map((pokemon)=> axios.get(pokemon.url));
        const pokemonData = await Promise.all(pokemonResultPromise);
        const res = Array.isArray(pokemonData) ? pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;

            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        }): [];
        SetPokemonList(res);
        console.log(res);
    }

    useEffect(() => {
        PokemonList();
        setLoading(false);
    }, []);


    return (
        <div className="pokemon-list">

            <span className="list-heading">List of pokemons</span>
            <div className="pokemon-wrapper">
                
            {loading ? 'Loading...' : 
                pokemonList.map((pokemon) => <Pokemon name={pokemon.name} img={pokemon.image} key={pokemon.id}/>)
            }
            </div>
        </div>
    );
}

export default PokemonList;