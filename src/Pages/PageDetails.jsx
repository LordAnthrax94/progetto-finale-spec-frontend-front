import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCard from '../Components/GameCard';
import { GlobalContext } from '../context/globalContext';

export default function PageDetails() {
  
  // Prendo l'id del gioco dai parametri dell'URL
  const { id } = useParams();

  // Prendo dal context la funzione per caricare i dettagli e lo stato del gioco
  const { fetchVideoGameDetails, videogame } = useContext(GlobalContext);  
  
  // Quando cambia l'id, richiamo la funzione per ottenere i dettagli del gioco
  useEffect(() => {
    fetchVideoGameDetails(id);
  }, [id, fetchVideoGameDetails]); 
  
  // Se il gioco ha un'immagine, la uso come sfondo
  const backgroundImage = videogame?.imageUrl
    ? { backgroundImage: `url(/img/${videogame.imageUrl})` }
    : {};

  return (
    <div
      className="relative min-h-screen flex flex-col items-center px-4 bg-cover bg-center"
      style={backgroundImage} // applico lo sfondo dinamico
    >
      {/* Overlay scuro per migliorare visibilità */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>

      {/* Contenuto principale: la scheda del gioco */}
      <div className="relative z-10 w-full flex justify-center flex-1">
        <GameCard videogame={videogame} />
      </div> 
    </div>
  )
}