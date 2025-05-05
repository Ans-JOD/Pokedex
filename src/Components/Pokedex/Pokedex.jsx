import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css";

const Pokedex = () => {
    const [searchedPokemon, setSearchedPokemon] = useState(null);

    return (
        <div className="box-wrapper">
            <h1>Pokedex</h1>
            <Search setSearchedPokemon={setSearchedPokemon}/>
            <PokemonList searchedPokemon={searchedPokemon} setSearchedPokemon={setSearchedPokemon} />
        </div>
    );
}


export default Pokedex;