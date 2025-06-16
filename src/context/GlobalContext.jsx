import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  const api_url = import.meta.env.VITE_API_URL;

  const [videogames, setVideogames] = useState("");

   const fetchVideoGames = () =>{
    fetch(`${api_url}/videogames`)
    .then(res => res.json())
    .then(data => setTasks(data))
    .catch((error) => console.error("Error fetching tasks:", error));    
  };

  useEffect(() => {
    fetchTasks();}, []);

    const value = { videogames, fetchVideoGames };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );

}