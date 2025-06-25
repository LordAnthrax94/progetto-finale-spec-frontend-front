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
  
  const backgroundImage = videogame?.imageUrl
    ? { backgroundImage: `url(/img/${videogame.imageUrl})` }
    : {};

    return (
      <div className="relative min-h-screen flex flex-col items-center px-4 bg-cover bg-center"
        style={backgroundImage}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
        <div className="relative z-10 w-full flex justify-center flex-1">
          <GameCard videogame={videogame} />        
        </div> 
      </div>
    )
}