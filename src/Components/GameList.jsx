import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/globalContext';

export default function GameList(){

  const {videogames, fetchVideoGames} = useContext(GlobalContext);

  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);  

   function sortByField(videogames, field, order) {
  return [...videogames].sort((a, b) =>
    order === '1'
      ? a[field].localeCompare(b[field])
      : b[field].localeCompare(a[field])
  );
}

const sortedVideogames = sortByField(
    Array.isArray(videogames) ? videogames : [],
    sortField,
    sortOrder
  );


  useEffect(() => {
    fetchVideoGames();}, []);

    
  return (
    <div className='videogames-list'>
      <button onClick={() => { setSortField('title'); setSortOrder('1'); }}>
          Titolo A-Z {sortField === 'title' && "↑"}
        </button>
        <button onClick={() => { setSortField('title'); setSortOrder('-1'); }}>
          Titolo Z-A {sortField === 'title' && "↓"}
        </button>
          {sortedVideogames.map((videogame) => (
            <div className='videogamelist' key={videogame.title}>              
              <h2>{videogame.title}</h2>              
              <h3>{videogame.category}</h3>              
            </div>
          ))}
        </div>
  )
}