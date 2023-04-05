import React from "react";
import '../Navigation/navigation.css'


function Navigation({ pokemonData, offset, setOffset, setEndpoint }) {

  const handleNextClick = () => {
    setOffset(offset + 10);
    setEndpoint(`?limit=12&offset=${offset + 10}`);
  };

  const handlePreviousClick = () => {
    if (offset > 0) {
      setOffset(offset - 10);
      setEndpoint(`?limit=12&offset=${offset - 10}`);
    }
  };

  return (

    <>
    <div className="nav-btn">
     <button onClick={handlePreviousClick} disabled={offset === 0}>PREVIOUS</button>
     <button onClick={handleNextClick} disabled={pokemonData && pokemonData.length < 10}>NEXT</button>
    </div>
    </>


  )

}

export default Navigation;