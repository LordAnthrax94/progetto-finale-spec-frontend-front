import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCard from '../Components/GameCard';
import { GlobalContext } from '../context/globalContext';

export default function PageDetails() {
  
  const { id } = useParams();
  const { fetchVideoGameDetails, videogame } = useContext(GlobalContext);  
  
  useEffect(()=>{
    fetchVideoGameDetails(id)
  }, [id, fetchVideoGameDetails]);    

    return (
      <div className="flex justify-center mb-5 bg-slate-600"> 
        <GameCard className="h-5" videogame={videogame} />        
      </div>
    )
}