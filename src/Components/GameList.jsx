import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/globalContext';
import { Link } from 'react-router-dom';

export default function GameList({ videogames }){

  const { fetchVideoGames } = useContext(GlobalContext);

  // Stato per la gestione del campo di ordinamento e dell'ordine
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);
  const [sortCategories, setSortCategories] = useState("");

// Funzione per ordinare i videogiochi in base al campo e all'ordine selezionati
   function sortByField(videogames, field, order) {
  return [...videogames].sort((a, b) =>
    order === '1'
      ? a[field].localeCompare(b[field])
      : b[field].localeCompare(a[field])
  );
}
// Ordinamento dei videogiochi in base al campo e all'ordine selezionati
const sortedVideogames = sortByField(
    Array.isArray(videogames) ? videogames : [],
    sortField,
    sortOrder
  );    
    
  const filteredCategories = Array.from(
    new Set(Array.isArray(videogames) ? videogames.map(vg => vg.category) : [])
  );

  const filteredVideogames = sortCategories
    ? sortedVideogames.filter(vg => vg.category === sortCategories)
    : sortedVideogames;

  return (
    <div className='videogames-list'>
      <button onClick={() => { setSortField('title'); setSortOrder('1'); }}>
          Titolo A-Z {sortField === 'title' && "↑"}
        </button>
        <button onClick={() => { setSortField('title'); setSortOrder('-1'); }}>
          Titolo Z-A {sortField === 'title' && "↓"}
        </button>
          {sortedVideogames.map((videogame) => (
            <div key={videogame.id}>              
              <Link to={`Dettagli/${videogame.id}`}>{videogame.title}</Link>              
              <h3>{videogame.category}</h3>
              <button>Aggiungi ai preferiti</button>
              <button>Compara con un altro prodotto</button>              
            </div>
          ))}

          <div>
            <select value={sortCategories} onChange={(e) => setSortCategories(e.target.value)}>
              <option value="">Scegli Categoria</option>
              {filteredCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>            
          </div>
          {sortCategories && filteredVideogames.map((videogame) => (
            <div key={videogame.id}>
              <Link to={`Dettagli/${videogame.id}`}>{videogame.title}</Link>
              <h3>{videogame.category}</h3>
            </div>
          ))}
        </div>
  )
}