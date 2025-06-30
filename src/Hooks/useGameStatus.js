import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";

export default function useGameStatus (videogame){
  const {favorites, compareList} = useContext(GlobalContext)

  const isFavorite = favorites.some(fav => fav.id === videogame.id);
  const isInCompare = compareList.some(game => game.id === videogame.id);


  return {isFavorite, isInCompare} 
   
}