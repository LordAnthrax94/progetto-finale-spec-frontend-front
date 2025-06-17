import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/globalContext';


export default function Home(){

  const {videogames, fetchVideoGames} = useContext(GlobalContext);
  
  const [search, setSearch] = useState(""); 

  useEffect(() => {
    fetchVideoGames();}, []);

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
            onChange={(e) => setSearch(e.target.value)}
         />
          <button className='search-button' onClick={handleSearch}>Cerca</button>

        <div className='videogames-list'>
          {Array.isArray(videogames) && videogames.map((videogame) => (
            <div className='videogamelist' key={videogame.title}>              
              <h2>{videogame.title}</h2>              
              <h3>{videogame.category}</h3>              
            </div>
          ))}
        </div>
    </div>
  )
}