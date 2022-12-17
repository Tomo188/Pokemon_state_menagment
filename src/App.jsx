import {
  Link,
  Outlet,
  ReactLocation,
  Router,
  useMatch,

} from "@tanstack/react-location";
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
   const initialState={data:[]};
   const reducer=(state,action)=>{
      switch(action.type){
        case "SET PAGE SCROLL":
          return {scroll:action.payload.scroll,scrollHeight:action.payload.scrollHeight}
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
