import './Pokemon.css';

const Pokemon = ( {name, img}) => {
    
    return (
        <div className="pokemon">
            <div className='pokemon-name'>{name}</div>
            <div> <img src={img} className='pokemon-img'/> </div>
        </div>
    )
}

export default Pokemon;