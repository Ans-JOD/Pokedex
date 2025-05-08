import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../PokemonList/PokemonList.css';
import './PokemonDetails.css'

const PokemonDetails = () => {
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({});
    const navigate = useNavigate();

    const downloadPokemon = async () =>{

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);
        setPokemon({
            name: response.data.name,
            Image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        })
    }


    useEffect(() => {
        downloadPokemon();
    }),[];

    return (
        <div className="box-wrapper">
        <div className="heading-with-button">
            <button className="btn" onClick={() => navigate('/')}>
              Back to List
            </button>
            <span className="list-heading">Search Result</span>
          </div>
                
                    <h2>{pokemon.name}</h2>
                    <div> <img src={pokemon.Image} className='pokemon-img'/> </div>
                    <div className='pokemon-name' style={{marginTop:'1rem'}}> weight: <span>{pokemon.weight}</span> kg </div>
                    <div className='pokemon-name'> height: <span>{pokemon.height}</span> </div> 
                    <div className='pokemon-types'>
                            {pokemon?.types?.map((t, index)=>
                                    <div className="type" key={index}>
                                        {t}
                                    </div>
                            )}
                    </div>     
        </div>
    )
}


export default PokemonDetails;