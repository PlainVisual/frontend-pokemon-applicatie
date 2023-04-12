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
  // De useState die wordt gebruikt om de error melding te tonen zodra de data niet kan worden geladen
  const [error, toggleError] = useState(false)
  // De useState die wordt gebruikt om de loading melding te tonen bij een trage verbinding
  const [loading, toggleLoading] = useState(true)
  // useEffect waarbij de endpoint bij wijziging ervoor zorgt dat dan pas de data wordt geupdate.
   useEffect(() => {

    async function fetchData() {

        

      	try {
          toggleError(false);
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

          setTimeout(() => {
          toggleLoading(false);
          }, 500);
          
        } catch(e) {

          console.error(e)
          toggleError(true);
          toggleLoading(false);
                  
        }
        
      
    }
   if(endpoint) {
    fetchData();
   }

  }, [ endpoint, setEndpoint, offset, setOffset ])

  return (
    <>
    <div className="outer-container">
      {loading && <span className='loadingMsg'>Hang on we are loading the data</span>}
      <div className="inner-container">
          <header>
            <div className="logo-container">
              <img className="header-image" src= { logo_pokomon } alt="logo-pokomon" />
            </div>
            
          </header>
          <div className="sticky">
            <Navigation
              pokemonData={pokemonData}
              offset={offset}
              setOffset={setOffset}
              setEndpoint={setEndpoint}
            />
            </div>
          <main>
                 
                 {error && <span>Something went wrong when fetching the data. Please try again later!</span>}
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
                        <PokemonCard 
                            key={ pokemon.id } 
                            pokemon={ pokemon } />
                              
                      ))
                    
                  )}  
            </main>
        </div>
     </div>
    </>
  );
}

export default App;
