import "./Search.css";

const Search = () =>{

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter pokemon name"
                className="search"
            />
        </div>
    );
}

export default Search;