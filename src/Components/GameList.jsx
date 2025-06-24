import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/globalContext';
import { Link } from 'react-router-dom';
import CategorySelect from '../Partials/CategorySelect';
import SortButton from './SortButton';

export default function GameList({ videogames }){ 
  
  const { fetchAllCategories, addToFavorites, favorites, removeFromFavorites, addToCompare, compareList } = useContext(GlobalContext);  
  const [filteredCategory, setFilteredCategory] = useState('');
  
   const filteredVideogames = filteredCategory
    ? sortedVideogames.filter(videogame => videogame.category === filteredCategory)
    : [];

    useEffect(() => {
      fetchAllCategories();
    }, []);
    
  return (
    <div>
      <SortButton videogames={videogames}>
        {(sortedVideogames) => (
          <div className='flex flex-wrap justify-center'>
            {sortedVideogames.map((videogame) => {
              const isFavorite = favorites.some(favorite => favorite.id === videogame.id);
              const isInCompare = compareList.some(game => game.id === videogame.id);
              return (
                <div key={videogame.id} className="w-full sm:w-64 md:w-72 lg:w-80 max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mt-5 mx-2 mb-6 flex flex-col">
                  <img className="w-full h-48 object-cover" src={`/img/${videogame.imageUrl}`} alt={videogame.title} />
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800">
                      <Link to={`/Dettagli/${videogame.id}`}>{videogame.title}</Link>
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">{videogame.category}</p>
                    <p className="text-gray-800 mb-4 flex-1">{videogame.description}</p>
                    <div className="flex justify-center mt-auto mb-4">
                      <button
                        className="bg-green-600 rounded text-white p-1 m-1"
                        onClick={() =>
                          isFavorite
                            ? removeFromFavorites(videogame.id)
                            : addToFavorites(videogame)
                        }
                      >
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
                </div>
              );
            })}
          </div>
        )}
      </SortButton>
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