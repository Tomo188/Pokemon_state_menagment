import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import { useRef } from "react";
import { Link,useMatch } from "@tanstack/react-location";
import { useState } from "react";
import "./pokemon.scss";
import { GraphAbilityPokemon } from "./GraphAbility";
import { SearchPokemons } from "./SearchPokemons";
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
        <GraphAbilityPokemon data={data} />
        </div>
       
    </div>)
}
export function FirstQ(){
    const [searchPokemon,setSearchPokemon]=useState("")
    const [numPokemons,setNumPokemons]=useState(20)   
    const [scroll,setScroll]=useState(0)
    function setLocalStorage(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    }
    function getLocalStorage(key){
        return JSON.parse(localStorage.getItem(key))
    }
    useEffect(()=>{  
        const onScroll=(event)=>{
            
            const {scrollHeight,scrollTop,clientHeight}=event.target.scrollingElement;
            
            
            setScroll(current=>{
                const scrolling=scrollTop
                setLocalStorage("pokemonScroll",JSON.stringify(Number(scrollTop)))
                return scrollTop;
            });
            
            if((scrollHeight)===scrollTop+clientHeight){
               setNumPokemons((current)=>{
                setLocalStorage("pokemons",current+10)
                    return current+10;
               })
               
              
            }
            if(scrollTop===0){
               setNumPokemons(current=>{  
                   setLocalStorage("pokemons",20)
                   return 20;
               })
               localStorage.clear();
               
               
               
            }
            
               
       }      
        document.addEventListener("scroll",onScroll)
        const scrolling=JSON.parse(localStorage.getItem("pokemons"));
        
        if(scrolling){
           setNumPokemons(current=>scrolling)
           const pokemonScroll=Number(JSON.parse(localStorage.getItem("pokemonScroll")))
           console.log(typeof JSON.parse(localStorage.getItem("pokemonScroll")))
           setScroll(pokemonScroll)
        }
       
        
        return ()=> document.removeEventListener("scroll",onScroll)
    },[])
    
    const query=getPokemons();
     
    if(query.isFetching)return(< div className="ring">Loading...<span></span></div>)
    if(query.error)return(<div>Somethingh went wrong</div>)
  return(<div className="pokemon" onLoad={()=>{
    
    window.scrollTo(0,scroll)
}}>
  <SearchPokemons search={searchPokemon} setSearch={setSearchPokemon} />
  {query.pokemon.filter(pokemon=>{
    if(searchPokemon){
      return pokemon.name.includes(searchPokemon);
    }
    return pokemon
  }).slice(0,numPokemons).map(pokemon=>{
    const overall=((pokemon.hp+pokemon.attack+pokemon.defense+pokemon.special_attack+pokemon.special_defense+pokemon.speed)/6).toFixed(0)
    return(
        <Link key={pokemon.id} id={pokemon.id} to={`/pokemon/${pokemon.id}`}>
        <div className="pokemon_card" key={pokemon.id} onClick={()=>localStorage.setItem("pokemonScroll",JSON.stringify(Number(scroll)))}>
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