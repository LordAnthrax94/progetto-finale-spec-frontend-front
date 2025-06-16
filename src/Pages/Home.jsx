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
         <input type="text"
            placeholder="Cerca un gioco..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
        <div>
          {videogames.map((videogame) => (
            <div key={videogame.id}>
              <h2>{videogame.title}</h2>
              <p>{videogame.description}</p>
              <img src={videogame.image} alt={videogame.title} />
            </div>
          ))}
        </div>
    </div>
  )
}