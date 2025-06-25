import { GlobalContext } from "../context/globalContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function FavoritePage({}){

   const { favorites, removeFromFavorites } = useContext(GlobalContext);  
   
  return (
    <div className="min-h-screen flex flex-col items-center px-4 bg-[url('/img/Portal2LoveCube.jpg')] bg-cover bg-center min-h-screen">
      <div className="w-full flex flex-col items-center mt-8 mb-8">
        <h1 className="text-4xl font-bold text-yellow-500 text-center mb-2">Lista preferiti</h1>
        <h2 className="text-lg text-yellow-500 text-center mb-4">Qui puoi visualizzare la lista dei tuoi preferiti</h2>
      </div>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">La tua pagina è vuota, aggiungi i tuoi giochi preferiti qui!</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {favorites.map(fav => (
            <div key={fav.id} className="w-full sm:w-64 md:w-72 lg:w-80 max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mt-5 mx-2 mb-6 flex flex-col">
              <img className="w-full h-48 object-cover" src={`/img/${fav.imageUrl}`} alt={fav.title} />
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-gray-800"><Link to={`/Dettagli/${fav.id}`}>{fav.title}</Link></h2>
                <p className="text-sm text-gray-500 mb-2">{fav.category}</p>
                <p className="text-gray-800 mb-4 flex-1">{fav.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-600">€{fav.price}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-sm mr-1">★</span>
                    <span className="text-sm text-gray-700">{fav.rating}/10</span>
                  </div>
                </div>
                <div className="flex justify-center mt-auto mb-4">
                  <button
                    className="bg-red-500 rounded text-black p-2 mt-2"
                    onClick={() => removeFromFavorites(fav.id)}>
                    Rimuovi dai preferiti
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}