import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCard from '../Components/GameCard';
import { GlobalContext } from '../context/globalContext';

export default function PageDetails() {
  
  const { id } = useParams();

  console.log(id);
  

  const { fetchVideoGameDetails, videogame } = useContext(GlobalContext);  
  
  useEffect(()=>{
    fetchVideoGameDetails(id)
  }, []);    

    return (
      <div>        
        <h1>Dettagli del Videogioco</h1>
        <p>Qui puoi visualizzare i dettagli di un videogioco specifico.</p>
        {/* Aggiungi qui i dettagli del videogioco */}
        <GameCard videogame={videogame} />        
      </div>
    )
}