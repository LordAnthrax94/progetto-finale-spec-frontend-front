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
      <div className="flex justify-center mb-5"> 
        <GameCard className="" videogame={videogame} />        
      </div>
    )
}