import React from 'react';
import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from './assets/components/PokemonCard/PokemonCard';
import Navigation from './assets/components/Navigation/Navigation';
import logo_pokomon from './assets/images/International_Pokémon_logo.svg.png';

function App() {
 // De useState voor opslaan data axios.get api request.
 const [pokemonData, setPokemonData ] = useState([]);
 // De useState die wordt gebruikt voor het opslaan van de endpoint. Eerste state toont 10 pokemons op de pagina.
 const [endpoint, setEndpoint] = useState('?limit=12&offset=0');
 // De useState die wordt gebruikt voor het opslaan van de offset van het aantal getoonde items
 const [offset, setOffset] = useState(0);
  // useEffect waarbij de endpoint bij wijziging ervoor zorgt dat dan pas de data wordt geupdate.
   useEffect(() => {

    async function fetchData() {

      	try {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ endpoint }&offset=${ offset }`);
          console.log(res.data.results);
          // Unieke pokemon url ophalen vanuit de results
            const pokemonUrls = res.data.results.map((pokemon) => { return pokemon.url });
          // DE url via axios aanspreken om de request per pokemon terug te halen
            const pokemonPromises = pokemonUrls.map((url) => { return axios.get(url) });
          // Via promise.all kunnen we alle url via await apsreken en de data laden
            const pokemonResponses = await Promise.all(pokemonPromises);
            const pokemonData = pokemonResponses.map(response => response.data);
          // De state wordt van de data voorzien in een array die we later via .map() gaan gebruiken om de data in te laden.
          setPokemonData(pokemonData);
          
        } catch(e) {

          console.error(e)
          // Dit is een error message die wordt getoond zodra de data niet wordt geladen
          const errorMsg = document.querySelector('.msgError')
          errorMsg.innerHTML = `<h3>----- No data was loaded, try again later -----</h3>`
          return errorMsg;
        
        }
      
    }
   if(endpoint) {
    fetchData();
   }

  }, [ endpoint, setEndpoint, offset, setOffset ])

  return (
    <>
    <div className="outer-container">
      <div className="inner-container">
          <header>
            <div className="logo-container">
              <img className="header-image" src= { logo_pokomon } alt="logo-pokomon" />
            </div>
            <Navigation
              pokemonData={pokemonData}
              offset={offset}
              setOffset={setOffset}
              setEndpoint={setEndpoint}
            />
          </header>
          <main>
                 { pokemonData.length === 0 ? (
                    // Bij een trage verbinding wordt eerste de msgError getoond. Dit kan ook een loading gif zijn. Daarna wordt na het laden van de data de pokemon's ingeladen.
                    <div className="msgError">
                      <p>Loading...</p>
                    </div>
                  ) : (
                    
                      pokemonData.map((pokemon) => (
                        // Ik maak hier gebruik van de map methode om een lijst van componenten te tonen.
                        // Component PokemonCard wordt hier geladen en de data wordt als prop aan het component doorgegeven.
                        // De key hier gebruikt zodat react hier ook voor elk component een uniek ID heeft.
                        <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
                              
                      ))
                    
                  )}  
            </main>
        </div>
     </div>
    </>
  );
}

export default App;
