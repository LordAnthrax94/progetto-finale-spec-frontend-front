import { useState, useCallback, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from '../context/globalContext';
import GameList from '../Components/GameList';

function debounce(callback, delay){
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  }  
}

export default function Home(){ 
  

  const { videogames, searchVideogames, fetchSearchResults } = useContext(GlobalContext);

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useRef(debounce(setDebouncedSearch, 500)); 

  const handleSearch = (e) => {
    setSearch(e.target.value)
    debounceRef.current(e.target.value);
    if( e.target.value.trim() === '') {
      setMessage("Non è stato trvato nessun gioco con questo nome")
    }else {
      setMessage("");
    }
  } 

  useEffect(() => {
    if (debouncedSearch.trim() !== '') {
      fetchSearchResults(debouncedSearch);
    }
  }, [debouncedSearch, fetchSearchResults]);

  const gameShowList = search.trim() === '' ? videogames : searchVideogames 

  const noResults = debouncedSearch.trim() !== '' &&
    Array.isArray(gameShowList) &&
    gameShowList.length === 0; 


  return (
    <div className="">
      <h1 className='flex justify-center text-yellow-500 font-bold m-5 text-4xl'>Esplora un mondo di videogiochi</h1>
        <div className="relative w-full max-w-9xl mx-auto mb-8  overflow-hidden shadow-lg">
          <video
            className="w-full h-80 object-cover"
            src="/Fortnite_Cinematic.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <p className="text-white text-2xl font-semibold">Scopri nuovi mondi, trova il tuo prossimo gioco preferito!</p>
          </div>
        </div>      
        <div className='flex justify-center'>
          <input 
            className="w-full max-w-xl px-6 py-3 rounded-lg border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none text-lg shadow-md"
            type="text"
            placeholder="Cerca un gioco..."
            value={search}
            onChange={handleSearch}            
          />
            {message && <p className='message'>{message}</p>}
            {noResults && <p className='message'>Non è stato trovato nessun gioco con questo nome</p>}
         </div>      
                   
        <div>
          <GameList videogames={Array.isArray(gameShowList) ? gameShowList : []}/>
        </div>

        
    </div>
  )
}