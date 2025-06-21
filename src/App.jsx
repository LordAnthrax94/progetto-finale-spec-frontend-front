import { GlobalProvider } from "./context/globalContext"
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ComparePage from "./Pages/ComparePage";
import FavouritePage from "./Pages/FavoritePage";
import PageDetails from "./Pages/PageDetails";
import { NavLink } from "react-router-dom";

function App() {
  

  return (    
      <GlobalProvider>
        <BrowserRouter>
          <nav className="flex justify-end bg-yellow-500 text-black gap-20 p-5 hover-black">
            <NavLink to="/" end className="p-1 font-medium">Home</NavLink>
            <NavLink to="/Compara" end className="p-1 font-medium">Compara</NavLink>
            <NavLink to="/Preferiti" end className="p-1 font-medium">I tuoi preferiti</NavLink>            
          </nav>          
          <Routes >
            <Route path="/" element={<Home />}/>
            <Route path="/Compara" element={<ComparePage />}/>
            <Route path="/Preferiti" element={<FavouritePage />}/>
            <Route path="/Dettagli/:id" element={<PageDetails />}/>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>    
  )
}

export default App
