import React from "react";
import "../PokemonCard/pokemonCard.css"
// De data (pokemon wordt hier als prop doorgegeven aan de component PokemonCard)
function PokemonCard({ pokemon }) {

    return (

           <div 
                key={ pokemon.name  } 
                // Als etxra optie de type Pokemon als className gebruikt. Zou ik kunnen stylen of kunnen filteren op type
                className={`pokemon__card ${ pokemon.types.map((className) => className.type.name.replace(",", " ")).join(" ")}`}
              >
              <div className="pokemon_img">
              <img 
                src={ pokemon.sprites.front_default } 
                alt={ pokemon.name }
              ></img>
              </div>
              <h1 className="pokemon_name">{ pokemon.name }</h1>
              <h2 className="pokemon_moves">Moves: { pokemon.moves.length }</h2>
              <h2 className="pokemon_weight">Weight: { pokemon.weight }</h2>
              <h2 className="pokemon_abilities_title">Abilities</h2>
              { pokemon.abilities.map((ability) => {
                  return (
                    <span className="pokemon_abilities" key={ ability.ability.name }><p>{ ability.ability.name }</p></span>
                  )

                }) }
              
        </div>
     
    )


}


export default PokemonCard;