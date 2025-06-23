import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/globalContext';
import { Link } from 'react-router-dom';
import CategorySelect from '../Partials/CategorySelect';

export default function GameList({ videogames }){ 
  
  const { fetchAllCategories, addToFavorites, favorites, removeFromFavorites, addToCompare, compareList } = useContext(GlobalContext);

  // Stato per la gestione del campo di ordinamento e dell'ordine
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);  
  const [filteredCategory, setFilteredCategory] = useState('');
  

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
  
   const filteredVideogames = filteredCategory
    ? sortedVideogames.filter(videogame => videogame.category === filteredCategory)
    : [];

    useEffect(() => {
      fetchAllCategories();
    }, []);
    
  return (
    <div>
      <div className='flex justify-center'>
        <button className='bg-yellow-500 m-3 p-1 rounded font-medium' onClick={() => { setSortField('title'); setSortOrder('1'); }}>
          Titolo A-Z {sortField === 'title' && "↑"}
        </button>
        <button className='bg-yellow-500 m-3 p-1 rounded font-medium' onClick={() => { setSortField('title'); setSortOrder('-1'); }}>
          Titolo Z-A {sortField === 'title' && "↓"}
        </button>
      </div>

      <div className='flex flex-wrap justify-center'>
        {sortedVideogames.map((videogame) => {            
          const isFavorite = favorites.some(favorite => favorite.id === videogame.id);
          const isInCompare = compareList.some(game => game.id === videogame.id);
          return (
            <div key={videogame.id} className="w-full sm:w-64 md:w-72 lg:w-80 max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mt-5 mx-2">
              <img className="w-full h-48 object-cover" src={`/img/${videogame.imageUrl}`} alt={videogame.title} />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800"><Link to={`/Dettagli/${videogame.id}`}>{videogame.title}</Link></h2>
                <p className="text-sm text-gray-500 mb-2">{videogame.category}</p>
                <p className="text-gray-800 mb-4">{videogame.description}</p>                  
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-green-600 rounded text-white p-1 m-1"
                  onClick={() => 
                    isFavorite 
                      ? removeFromFavorites(videogame.id) 
                      : addToFavorites(videogame)
                  }>
                  {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                </button>
                <button
                  className="bg-yellow-600 rounded text-black p-1 m-1"
                  onClick={() => addToCompare(videogame)}
                  disabled={isInCompare}
                >
                  {isInCompare ? "In confronto" : "Compara"}
                </button>  
              </div>
              
            </div>
          );
        })}
      </div>
      <div className="min-h-screen mt-10">           
        <div className="flex justify-center mb-8">                   
            <CategorySelect onCategoryChange={setFilteredCategory} />          
        </div>
        <div className='flex justify-center'>
          {filteredCategory && (
            <div className='flex flex-col items-center w-full'>
              <h3 className='text-yellow-500 font-medium mb-6'>
                Risultati per categoria: {filteredCategory}
              </h3>
              {filteredVideogames.length === 0
                ? <p>Nessun gioco trovato per questa categoria.</p>
                : (
                  <div className="flex flex-wrap justify-center w-full">
                    {filteredVideogames.map(videogame => (
                      <div key={videogame.id} className="w-full sm:w-64 md:w-72 lg:w-80 max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mt-5 mx-2">
                        <img className="w-full h-48 object-cover" src={`/img/${videogame.imageUrl}`} alt={videogame.title} />
                        <div className="p-4">
                          <h2 className="text-xl font-bold text-gray-800">
                            <Link to={`/Dettagli/${videogame.id}`}>{videogame.title}</Link>
                          </h2>
                          <p className="text-sm text-gray-500 mb-2">{videogame.category}</p>
                          <p className="text-gray-800 mb-4">{videogame.description}</p>                  
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          )}          
        </div> 
      </div>        
    </div>
  );
}