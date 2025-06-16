import { useState, useEffect } from 'react';


export default function Home(){

  const [videogames, setVideogames] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {    
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/videogames');
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
            <div className='videogamelist' key={videogame.id}>
              <img src={videogame.image} alt={videogame.title} />
              <h2>{videogame.title}</h2>              
              <p>{videogame.category}</p>              
            </div>
          ))}
        </div>
    </div>
  )
}