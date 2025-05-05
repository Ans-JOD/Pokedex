import { useState } from "react";
import "./Search.css";
import axios from "axios";

const Search = ({setSearchedPokemon}) =>{
    const [value, setValue] = useState('');

    const handleSearch = async (e) => {
        if (e.key === 'Enter' && value.trim() !== '') {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`);
                const pokemon = response.data;
                const formattedPokemon = {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: (pokemon.sprites.other?.dream_world?.front_default) || pokemon.sprites.front_shiny,
                    types: pokemon.types
                };
                setSearchedPokemon(formattedPokemon);
            } catch (error) {
                console.log(error);
                alert("Pokémon not found!", {error});
                setSearchedPokemon(null);
            }
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter pokemon name"
                className="search"
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                onKeyDown={handleSearch}
            />
        </div>
    );
}

export default Search;