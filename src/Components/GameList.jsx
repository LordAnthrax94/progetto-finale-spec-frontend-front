import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/globalContext';

export default function GameList(){

  const {videogames, fetchVideoGames} = useContext(GlobalContext);


  useEffect(() => {
    fetchVideoGames();}, []);

    
  return (
    <div className='videogames-list'>
          {Array.isArray(videogames) && videogames.map((videogame) => (
            <div className='videogamelist' key={videogame.title}>              
              <h2>{videogame.title}</h2>              
              <h3>{videogame.category}</h3>              
            </div>
          ))}
        </div>
  )
}