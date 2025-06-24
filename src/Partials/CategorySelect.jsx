import { useContext, useState } from 'react';
import { GlobalContext } from '../context/globalContext';

export default function CategorySelect({ onCategoryChange }) {
  const { categoryVideogames } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    onCategoryChange(e.target.value);
  };

  return (
    <select className='rounded bg-white hover:bg-yellow-500 font-medium w-full sm:w-64 md:w-80 px-4 py-2 text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all' 
      value={selectedCategory} onChange={handleChange}>
      <option value="">Tutte le categorie</option>
      {Array.isArray(categoryVideogames) && categoryVideogames.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  );
}