import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


function PokemonCard() {

 const [pokemonData, setPokemonData ] = useState({})
 const [endpoint, setEndpoint] = useState('')

   useEffect(() => {

    async function fetchData() {

      	try {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ endpoint }`);
          console.log(res.data);

          setPokemonData(res.data);
          
        } catch(e) {

          console.error(e)

        }
      
    }
   if(endpoint) {
    fetchData();
   }

  }, [ endpoint ])


  const handleJigglypuffClick = () => {
    setEndpoint("jigglypuff");
  };

  const handleDittoClick = () => {
    setEndpoint("ditto");
  };
  

  return (

   
    <div className="pokemon_card">
      <button onClick={handleJigglypuffClick}>Jigglypuff</button>
      <button onClick={handleDittoClick}>Ditto</button>
    {Object.keys(pokemonData).length > 0 &&
     <>
    <img src={ pokemonData.sprites.front_default } alt={ pokemonData.name }></img>
    <h1>{ pokemonData.name }</h1>
    <h2>Moves: { pokemonData.moves.length }</h2>
    <h2>Weight: { pokemonData.weight }</h2>
    <h2>Abilities</h2>
    <p>{ pokemonData.abilities[0].ability.name }</p>
    <p></p>
    </>
    }
    </div>
    


  )


}


export default PokemonCard;