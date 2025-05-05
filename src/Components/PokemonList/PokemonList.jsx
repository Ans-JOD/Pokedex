import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
    const [loading, setLoading] = useState(true);
    const [pokemonList, SetPokemonList] = useState([]);
    const [pokedexURL, setPodedexURL] = useState('https://pokeapi.co/api/v2/pokemon');
    const [prevURL, setPrevULR] = useState('');
    const [nextURL, setNextURL] = useState('');

    async function PokemonList(){
        setLoading(true)
        const response = await axios.get(pokedexURL);
        const pokemonResult = response.data.results;
        setNextURL(response.data.next);
        console.log(response.data.next);
        setPrevULR(response.data.previous);  
        console.log(response.data.previous);           
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
    }, [pokedexURL, nextURL, prevURL]);


    return (
        <div className="pokemon-list">

            <div className="heading-with-button">
                <button className="btn" disabled={prevURL == null} onClick={() => setPodedexURL(prevURL)}>Prev</button>
                <span className="list-heading">List of pokemons</span> 
                <button className="btn" disabled={nextURL == null} onClick={() => setPodedexURL(nextURL)}>Next</button>
            </div>
            
            <div className="pokemon-wrapper">
                
            {loading ? 'Loading...' : 
                pokemonList.map((pokemon) => <Pokemon name={pokemon.name} img={pokemon.image} key={pokemon.id}/>)
            }
            </div>
        </div>
    );
}

export default PokemonList;