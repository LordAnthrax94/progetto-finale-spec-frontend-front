import { createContext, useState, useEffect, useCallback } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const api_url = import.meta.env.VITE_API_URL;

  // Stati principali
  const [videogames, setVideogames] = useState([]);
  const [videogame, setVideogame] = useState("");
  const [searchVideogames, setSearchVideogames] = useState([]);
  const [categoryVideogames, setCategoryVideogames] = useState([]);
  const [compareList, setCompareList] = useState([]);

  // Fetch lista completa videogiochi (con immagine)
  const fetchVideoGames = async () => {
    try {
      const response = await fetch(`${api_url}/videogameses`);
      const data = await response.json();

      // Fetch dettagliata per ogni gioco (es. per ottenere imageUrl)
      const detailedGamesPromises = data.map(game =>
        fetch(`${api_url}/videogameses/${game.id}`)
          .then(res => res.json())
          .then(detail => ({
            ...game,
            imageUrl: (detail.videogames || detail).imageUrl
          }))
          .catch(() => game) // fallback in caso di errore
      );

      const detailedGamesResults = await Promise.allSettled(detailedGamesPromises);
      const detailedGames = detailedGamesResults
        .filter(result => result.status === "fulfilled")
        .map(result => result.value);

      setVideogames(detailedGames);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchVideoGames();
  }, []);

  // Fetch dettagli di un singolo videogioco
  const fetchVideoGameDetails = useCallback(async (id) => {
    try {
      const response = await fetch(`${api_url}/videogameses/${id}`);
      const data = await response.json();
      setVideogame(data.videogames);
      return data.videogames;
    } catch (error) {
      console.error("Error fetching video game details:", error);
      return null;
    }
  }, [api_url]);

  // Stato iniziale dei preferiti da localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Salvataggio automatico dei preferiti nel localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Funzione generica per aggiungere a una lista (preferiti o comparatore)
  const addGameToList = async (list, setList, videogame) => {
    if (videogame.imageUrl && videogame.price && videogame.rating) {
      setList(prev => prev.some(game => game.id === videogame.id) ? prev : [...prev, videogame]);
    } else {
      try {
        const response = await fetch(`${api_url}/videogameses/${videogame.id}`);
        const data = await response.json();
        const detailedGame = data.videogames || data;
        setList(prev => prev.some(game => game.id === detailedGame.id) ? prev : [...prev, detailedGame]);
      } catch (error) {
        console.error("Errore nel recupero dettagli videogioco:", error);
      }
    }
  };

  // Aggiunta a preferiti e comparatore
  const addToCompare = (videogame) => addGameToList(compareList, setCompareList, videogame);
  const addToFavorites = (videogame) => addGameToList(favorites, setFavorites, videogame);

  // Funzione generica per rimozione da una lista
  const removeGameFromList = (setList, gameId) => {
    setList(prev => prev.filter(game => game.id !== gameId));
  };

  // Rimozione da preferiti e comparatore
  const removeFromFavorites = (gameId) => removeGameFromList(setFavorites, gameId);
  const removeFromCompare = (gameId) => removeGameFromList(setCompareList, gameId);

  // Fetch risultati di ricerca
  const fetchSearchResults = useCallback(async (query) => {
    try {
      const response = await fetch(`${api_url}/videogameses?search=${query}`);
      const data = await response.json();

      const detailedGamesPromises = data.map(game =>
        fetch(`${api_url}/videogameses/${game.id}`)
          .then(res => res.json())
          .then(detail => ({
            ...game,
            imageUrl: (detail.videogames || detail).imageUrl
          }))
          .catch(() => game)
      );

      const detailedGamesResults = await Promise.allSettled(detailedGamesPromises);
      const detailedGames = detailedGamesResults
        .filter(result => result.status === "fulfilled")
        .map(result => result.value);

      setSearchVideogames(detailedGames);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [api_url]);

  // Fetch di tutte le categorie disponibili
  const fetchAllCategories = useCallback(async () => {
    try {
      const response = await fetch(`${api_url}/videogameses`);
      const data = await response.json();
      const categories = Array.from(new Set(data.map(videogame => videogame.category)));
      setCategoryVideogames(categories);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [api_url]);

  // (Opzionale) Fetch di giochi filtrati per categoria
  const fetchCategories = async (queryCategory) => {
    try {
      const response = await fetch(`${api_url}/videogameses?category=${queryCategory}`);
      const data = await response.json();
      setVideogames(data);
    } catch (error) {
      console.error("Error filtering by category:", error);
    }
  };

  // Valori forniti dal context
  const value = {
    videogames,
    fetchVideoGames,
    videogame,
    fetchVideoGameDetails,
    searchVideogames,
    fetchSearchResults,
    categoryVideogames,
    fetchAllCategories,
    fetchCategories,
    favorites,
    addToFavorites,
    removeFromFavorites,
    compareList,
    addToCompare,
    removeFromCompare
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}