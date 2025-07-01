// Import dei principali hook React e del contesto globale
import { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from '../context/globalContext';

// Componenti personalizzati per la UI
import GameList from '../Components/GameList';
import CategoryGameList from '../Components/CategoryGameList';
import CategorySelect from '../Partials/CategorySelect';

// Funzione debounce: ritarda l'esecuzione di una funzione dopo un certo delay
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function Home() {

  // Destrutturo dal context globale le funzioni e dati necessari
  const { 
    videogames, 
    searchVideogames, 
    fetchSearchResults,
    fetchAllCategories 
  } = useContext(GlobalContext);

  // Stato per il valore dell'input di ricerca
  const [search, setSearch] = useState("");  

  // Stato per il valore "debounced" (ritardato) della ricerca
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Ref che contiene la funzione debounce
  const debounceRef = useRef(debounce(setDebouncedSearch, 1000)); 

  // Stato per la categoria filtrata
  const [filteredCategory, setFilteredCategory] = useState('');

  // Funzione per aggiornare il valore di ricerca e attivare il debounce
  const handleSearch = (e) => {
    setSearch(e.target.value);
    debounceRef.current(e.target.value);
  };    

  // Effetto che esegue la ricerca solo quando il valore debounced cambia
  useEffect(() => {
    if (debouncedSearch.trim() !== '') {
      fetchSearchResults(debouncedSearch);
    }
  }, [debouncedSearch, fetchSearchResults]);

  // Lista da mostrare: se c'è ricerca attiva, usa i risultati; altrimenti tutti i giochi
  const gameShowList = search.trim() === '' ? videogames : searchVideogames;

  // Verifica se la ricerca ha prodotto zero risultati
  const noResults = debouncedSearch.trim() !== '' &&
    Array.isArray(gameShowList) &&
    gameShowList.length === 0;

  // Alla prima render, carica tutte le categorie disponibili
  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 bg-[url('/img/elden-ring-game-wallpaper.jpg')] bg-cover bg-center">
      {/* Overlay scuro sopra l'immagine di sfondo */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-30 z-0"></div>

      <div className="relative z-10 w-full">
        {/* Titolo principale */}
        <h1 className='flex justify-center text-yellow-500 font-bold m-5 text-4xl'>
          Esplora un mondo di videogiochi
        </h1>

        {/* Video di presentazione */}
        <div className="relative w-full max-w-9xl mx-auto mb-8 overflow-hidden shadow-lg">
          <video
            className="w-full h-[220px] sm:h-[320px] md:h-[450px] lg:h-[600px] object-cover"
            src="/img/Warhammer 40,00 Space Marine 2 Gameplay (No Commentary) [ZOfdBXhy94A].f628.mp4" 
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <p className="text-white text-2xl font-semibold">
              Scopri nuovi mondi, trova il gioco che fa per te!
            </p>
          </div>
        </div>

        {/* Input di ricerca */}
        <div className='flex justify-center'>
          <input 
            className="w-full max-w-xl px-6 py-3 rounded-lg border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none text-lg shadow-md"
            type="text"
            placeholder="Cerca un gioco..."
            value={search}
            onChange={handleSearch}
          />
        </div>          

        {/* Messaggio in caso di nessun risultato */}
        {noResults && (
          <div className="flex justify-center my-4">
            <p className='text-yellow-500 font-medium'>
              Non è stato trovato nessun gioco con questo nome
            </p>
          </div>
        )}

        {/* Mostra i giochi se ci sono risultati */}
        {!noResults && (
          <GameList videogames={Array.isArray(gameShowList) ? gameShowList : []} />
        )}

        {/* Selettore per filtrare per categoria */}
        <div className="flex justify-center my-8">
          <CategorySelect onCategoryChange={setFilteredCategory} />
        </div>

        {/* Lista giochi filtrati per categoria */}
        <div className='mb-6'>
          {filteredCategory && (
            <CategoryGameList 
              videogames={videogames} 
              category={filteredCategory} 
            />
          )}
        </div>               
      </div>
    </div>
  );
}