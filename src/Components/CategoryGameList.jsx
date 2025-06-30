import { Link } from 'react-router-dom';

export default function CategoryGameList({ videogames, category }) {

  // condizione per cui se esistono elementi nella categoria li mostra
  const filteredVideogames = category
    ? videogames.filter(v => v.category === category)
    : [];

  return (

    // Componente contenente le card della categoria selezionata, se non trova risultati per essa restituisce un messaggio, altrimenti fa
    // vedere la lista con i titoli cliccabili per visitare la pagina del dettaglio
    <div className='flex flex-col items-center w-full'>
      <h3 className='text-yellow-500 font-medium mb-6'>
        Risultati per categoria: {category}
      </h3>
    

      {filteredVideogames.length === 0 ? (
        <p className="text-center text-red-700 text-xl font-medium mb-4 w-full">
          Nessun gioco trovato per questa categoria.
        </p>
      ) : (
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
      )}
    </div>
  );
}