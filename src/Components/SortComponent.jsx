import { useState, useMemo } from "react";

export default function SortButton({ children, videogames }) {

  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);  

// Funzione per ordinare i videogiochi in base al campo e all'ordine selezionati
    const sortedVideogames = useMemo(() => {
    if (!Array.isArray(videogames)) return [];
    return [...videogames].sort((a, b) =>
      sortOrder === '1'
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField])
    );
  }, [videogames, sortField, sortOrder]);
     
  return (
    <>
      <div className='flex justify-center mb-4'>
        <button
          className={`m-3 p-1 rounded font-medium transition-colors duration-200 ${
            sortField === 'title' && sortOrder === '1'
              ? 'bg-yellow-500 text-black'
              : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => { setSortField('title'); setSortOrder('1'); }}
        >
          Titolo A-Z {sortField === 'title' && sortOrder === '1' && "↑"}
        </button>
        <button
          className={`m-3 p-1 rounded font-medium transition-colors duration-200 ${
            sortField === 'title' && sortOrder === '-1'
              ? 'bg-yellow-500 text-black'
              : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => { setSortField('title'); setSortOrder('-1'); }}
        >
          Titolo Z-A {sortField === 'title' && sortOrder === '-1' && "↓"}
        </button>
      </div>      
      {children(sortedVideogames)}
    </>
  )
}