import { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';
import { Link } from 'react-router-dom';
import SortButton from './SortComponent';
import useGameStatus from '../Hooks/useGameStatus';

// Componente GameList:
// Mostra una lista di videogiochi passati come prop, ognuno rappresentato da una card.
// È racchiuso nel componente SortButton, che permette di ordinare i giochi alfabeticamente (crescente o decrescente).
// Per ogni videogioco viene verificata la presenza nei preferiti e nella lista di confronto, per adattare i pulsanti.
// Lo stile è gestito con Tailwind CSS e i titoli sono linkabili alla pagina di dettaglio.

export default function GameList({ videogames }){ 
  
  const { addToFavorites, removeFromFavorites, addToCompare } = useContext(GlobalContext);  
  
    
  return (
    <SortButton videogames={videogames}>
      {(sortedVideogames) => (
        <div className='flex flex-wrap justify-center'>
          {sortedVideogames.map((videogame) => {
            const {isFavorite, isInCompare} = useGameStatus(videogame)
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
  );
}