import { useContext, useState } from 'react';
import { GlobalContext } from '../context/globalContext';

export default function CategorySelect({ onCategoryChange }) {
  // Prendo dal context la lista delle categorie disponibili
  const { categoryVideogames } = useContext(GlobalContext);

  // Stato per tracciare la categoria selezionata dall'utente
  const [selectedCategory, setSelectedCategory] = useState('');

  // Funzione chiamata quando cambia la selezione nel menu a tendina
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);  // aggiorno lo stato locale
    onCategoryChange(e.target.value);     // passo la categoria selezionata al componente padre
  };

  return (
    <select 
      className='rounded bg-white hover:bg-yellow-500 font-medium w-full sm:w-64 md:w-80 px-4 py-2 text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all' 
      value={selectedCategory} 
      onChange={handleChange} // gestisco il cambio di categoria
    >
      {/* Opzione per selezionare tutte le categorie */}
      <option value="">Tutte le categorie</option>

      {/* Creo una option per ogni categoria disponibile */}
      {Array.isArray(categoryVideogames) && categoryVideogames.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  );
}