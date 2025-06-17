import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  const api_url = import.meta.env.VITE_API_URL;

  const [videogames, setVideogames] = useState("");

  const fetchVideoGames = async () => {
  try {
    const response = await fetch(`${api_url}/videogameses`);
    const data = await response.json();
    setVideogames(data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

  useEffect(() => {
    fetchVideoGames();}, []);

    const value = { videogames, fetchVideoGames };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );

}