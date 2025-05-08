import { Link } from 'react-router-dom';
import './Pokemon.css';

const Pokemon = ( {name, img, id}) => {
    
    return (
        <Link to={`/pokemon/${id}`}>
            <div className="pokemon">
                <div className='pokemon-name'>{name}</div>
                <div> <img src={img} className='pokemon-img'/> </div>
            </div>
        </Link>
    )
}

export default Pokemon;