import { useContext} from "react";
import { GlobalContext } from "../context/globalContext";

export default function Comparatore(){

  const { compareList, removeFromCompare, favorites, addToFavorites, removeFromFavorites } = useContext(GlobalContext);
  
  // const isFavorite = favorites.some(favorite => favorite.id === game.id);

  return (
     <div className="m-4">      
      {compareList.length === 0 && (
        <p className="text-center text-yellow-500 text-xl mb-4">
          Non hai ancora selezionato videogiochi da confrontare.
        </p>
      )}

      {compareList.length > 0 && (
        <div>
          <div>
            <p className="text-center text-yellow-500 font-medium mb-4">Hai selezionato {compareList.length} videogiochi da confrontare.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {compareList.map(game => {
              const isFavorite = favorites.some(favorite => favorite.id === game.id);
              return (
              <div key={game.id} className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img className="w-full h-48 object-cover" src={`/img/${game.imageUrl}`} alt={game.title} />
                <div className="p-1">
                  <h2 className="text-xl font-bold text-gray-800">{game.title}</h2>
                  <p className="mt-1"><strong>Categoria: </strong><span className="text-sm text-gray-500 mb-2">{game.category}</span></p>
                  <p className="mt-1"><strong>Descrizione: </strong><span className="text-gray-800 mb-4">{game.description}</span></p>
                  <div className="flex items-center justify-between mt-1">
                    <p><strong>Prezzo: </strong><span className="text-lg font-semibold text-blue-600">€{game.price}</span></p>                                  
                  </div>
                  <div className="flex items-center mt-1">                  
                    <p><strong>Rating:</strong> <span className="text-sm text-gray-700">{game.rating}/10</span><span className="text-yellow-400 text-sm mr-1">★</span></p>
                  </div>
                  <div className="flex justify-center">
                    <button className="bg-yellow-600 rounded text-black p-1 m-1" onClick={() => removeFromCompare(game.id)}>Rimuovi dal confronto</button>
                  </div>
                  <div>
                    <button
                        className="bg-green-600 rounded text-white p-1 m-1"
                        onClick={() =>
                          isFavorite
                            ? removeFromFavorites(game.id)
                            : addToFavorites(game)
                        }
                      >
                        {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                      </button>
                  </div>                
                </div>
              </div>
              );
            })}
          </div>
        </div>
      )}

      {compareList.length > 0 && compareList.length < 2 && (
        <p className="text-center text-red-700 text-xl font-medium mb-4">Seleziona almeno due videogiochi per confrontarli.</p>
      )}
    </div>
  );
}