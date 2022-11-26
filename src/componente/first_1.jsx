import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import { useRef } from "react";
import { Link,useMatch } from "@tanstack/react-location";
import "./pokemon.scss";
export function getPokemons(){
    const {isFetching,isLoading,error,data:pokemon}=useQuery(
        ["pokemon"],()=>fetch("http://localhost:5173/pokemon.json").then(resp=>resp.json()),{
            initialData:[]
        }
        
    )
    
    return {pokemon,isFetching,isLoading,error};
}

export const pokemonCard=(id)=>{
    return getPokemons().pokemon.find(pokemon=>pokemon.id===id)
}
export function PokemonCard(){
    const {params:{id}}=useMatch()
    const {isFetching,error,pokemon}=getPokemons()
    console.log(pokemon)
    const data=pokemon.find(pokemon=>pokemon.id===+id)
    if(isFetching)return(< div className="ring">Loading...<span></span></div>)
    if(error)return(<div>Somethingh went wrong</div>)
    
    return (<div className="pokemon_info">
        <Link to={"/"}>
        <h1 className="text-2xl font-bold mb-5">&lt; Home</h1>
        </Link>
        <h2>{data?.name}</h2>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${+id}.png`} alt="" />
        <div className="right">
             <h3>speed: {data?.speed}</h3>
        <h3>hp : {data?.hp}</h3>
        <h3>attack: {data?.attack}</h3>
        <h3>defense: {data?.defense}</h3>
        <h3>special attack: {data?.special_attack}</h3>
        <h3>special defence: {data?.special_defense}</h3>
        </div>
       
    </div>)
}
export function FirstQ(){
    const numPokemons=useRef(20)   
    useEffect(()=>{  
        const onScroll=(event)=>{
             const {scrollHeight,scrollTop,clientHeight}=event.target.scrollingElement;
        }      
        document.addEventListener("scroll",onScroll)
        return ()=> document.removeEventListener("scroll",onScroll)
    },[])
    const query=getPokemons();
     
    if(query.isFetching)return(< div className="ring">Loading...<span></span></div>)
    if(query.error)return(<div>Somethingh went wrong</div>)
  return(<div className="pokemon">
  {query.pokemon.slice(0).map(pokemon=>{
    const overall=((pokemon.hp+pokemon.attack+pokemon.defense+pokemon.special_attack+pokemon.special_defense+pokemon.speed)/6).toFixed(0)
    return(
        <Link id={pokemon.id} to={`/pokemon/${pokemon.id}`}>
        <div className="pokemon_card" key={pokemon.id}>
            <div>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt="" />
            </div>
            
             <h3>{pokemon.name}</h3>
             <h4>{overall}</h4>
        </div>
        </Link>   
   )
  })}
  </div>)
}