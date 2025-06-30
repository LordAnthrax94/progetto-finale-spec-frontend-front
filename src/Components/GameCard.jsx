import { GlobalContext } from "../context/globalContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import useGameStatus from "../Hooks/useGameStatus";

export default function GameCard({ videogame }) {

  const { addToFavorites, removeFromFavorites, addToCompare } = useContext(GlobalContext)
  

  const {isFavorite, isInCompare} = useGameStatus(videogame)

  // Componente GameCard:
  // Rappresenta una singola card di videogioco con stile gestito tramite Tailwind CSS.
  // Verifica se il videogioco è già presente nei preferiti o nella lista di confronto.
  // In base a queste verifiche, i pulsanti cambiano comportamento:
  // - Aggiunge o rimuove dai preferiti
  // - Aggiunge al comparatore (disabilitato se già presente)
  // Include un link per tornare alla home page.

  return (    
    <div className="mt-10">
      <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img className="w-full h-48 object-cover" src={`/img/${videogame.imageUrl}`} alt={videogame.title} />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{videogame.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{videogame.category}</p>
          <p className="text-gray-800 mb-4">{videogame.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-blue-600">€{videogame.price}</span>
            <div className="flex items-center">
              <span className="text-yellow-400 text-sm mr-1">★</span>
              <span className="text-sm text-gray-700">{videogame.rating}/10</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
         <button className="bg-green-600 rounded text-white p-1 m-1"
          onClick={() => 
            isFavorite 
              ? removeFromFavorites(videogame.id) 
              : addToFavorites(videogame)
          }>
            {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
         </button>

        <button className="bg-yellow-600 rounded text-black p-1 m-1"
          onClick={() => addToCompare(videogame)}
          disabled={isInCompare}
        >
          {isInCompare ? "In confronto" : "Compara"}
        </button>
        </div>
      </div>
        <div className="flex justify-center">        
          <Link className="bg-yellow-500 text-black font-medium rounded mt-5 p-1" to="/">Torna alla Home</Link>        
        </div>
      </div>
    );
}