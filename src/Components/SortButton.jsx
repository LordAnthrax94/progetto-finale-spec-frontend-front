import { useState, useMemo } from "react";

export default function SortButton({ children, videogames }) {

  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);  

// SortComponent è un componente che consente di ordinare una lista di videogiochi
// in ordine alfabetico crescente o decrescente in base al campo selezionato (di default "title").
// Utilizza useMemo per memorizzare il risultato ordinato e ridurre i calcoli
// quando le dipendenze non cambiano (videogames, campo e ordine).
// Il componente utilizza render props (children) per passare la lista ordinata 
// e permette così a chi lo usa di gestire la visualizzazione come preferisce.


    const sortedVideogames = useMemo(() => {
    if (!Array.isArray(videogames)) return [];
    return [...videogames].sort((a, b) =>
      sortOrder === 1
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField])
    );
  }, [videogames, sortField, sortOrder]);

  function toggleSort(){
    setSortOrder(prevOrder =>(prevOrder === 1? -1 : 1))
  }
     
  return (
    <>
      <div className='flex justify-center mb-4'>
        <button
          aria-pressed={sortOrder === 1}
          className="m-3 p-1 rounded font-medium transition-colors duration-200 bg-yellow-500 text-black"
          onClick={toggleSort}
        >
          {sortOrder === 1 ? "Titolo A-Z ↑" : "Titolo Z-A ↓"}
        </button>        
      </div>      
      {children(sortedVideogames)}
    </>
  )
}