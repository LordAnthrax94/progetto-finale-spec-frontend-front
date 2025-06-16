import { createContext } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );

}