import { useState, useEffect } from 'react';


export default function Home(){

  const api_url = import.meta.env.VITE_API_URL;

  const [videogames, setVideogames] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {    
    const fetchData = async () => {
      const response = await fetch(`${api_url}/videogameses`);
      const data = await response.json();
      setVideogames(data);
    };
    fetchData();
  }, []);


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

        <div className='videogames-list'>
          {videogames.map((videogame) => (
            <div className='videogamelist' key={videogame.title}>
              <img src={videogame.image} alt={videogame.title} />
              <h2>{videogame.title}</h2>              
              <p>{videogame.category}</p>              
            </div>
          ))}
        </div>
    </div>
  )
}