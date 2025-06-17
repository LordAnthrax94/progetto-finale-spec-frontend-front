import { useState, useCallback, useMemo, useContext } from 'react';
import { GlobalContext } from '../context/globalContext';
import GameList from '../Components/GameList';

function debounce(callback, delay){
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  }  
}

export default function Home(){ 

  const { videogames } = useContext(GlobalContext); 

  const [search, setSearch] = useState(""); 
  

  const debaunceSearch = useCallback(
  debounce(setSearch, 500), []);

  
 

  
  

    const handleSearch = (e) =>{
      e.preventDefault();

    }

  return (
    <div>
      <h1>Esplora un mondo di videogiochi</h1>
         <input 
            className='search-input'
            type="text"
            placeholder="Cerca un gioco..."
            value={search}
            onChange={(e) => debaunceSearch(e.target.value)}            
         />      
                   
        <div>
          <GameList />
        </div>

        
    </div>
  )
}