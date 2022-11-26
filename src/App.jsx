import {
  Link,
  Outlet,
  ReactLocation,
  Router,
  useMatch,

} from "@tanstack/react-location";
import { useQuery } from "@tanstack/react-query"
import { useReducer } from "react";
import {FirstQ} from "./componente/first_1"
import { PokemonCard } from "./componente/first_1";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import { createContext } from "react";

import './App.css'
const queryClient=new QueryClient();
const location=new ReactLocation();
export const  PokemonData=createContext("tomo")
const routes = [
  {
    path: "/",
    element: (
      <>
        <FirstQ />
      </>
    ),
  },
  {
    path: "/pokemon/:id",
    element:<PokemonCard />
  },
];

function App() {
   console.log(queryClient.getQueriesData("pokemon"))
   const initialState={data:[]};
   const reducer=(state,action)=>{
    console.log(action.type)
       switch(action.type){
        case "SET POKEMON DATA":
          return {data:"gg"}
       }
   }
   const [data,dispatch]=useReducer(reducer,initialState)
  return (
    <div className="App">
      
      <QueryClientProvider client={queryClient}>
      <PokemonData.Provider value={{data,dispatch}}> 
      <Router location={location} routes={routes}>
      <Outlet />
      </Router> 
       </PokemonData.Provider>
      </QueryClientProvider>
    
      
    </div>
  )
}

export default App
