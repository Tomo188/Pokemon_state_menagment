import "./searchPokemon.scss"
export function SearchPokemons(props){
    return (
        <div className="input_search">
            <input type="text" value={props.search} onChange={(e)=>{
                props.setSearch(e.target.value)
            }} placeholder={"search for pokemons"} />

        </div>
    )
}