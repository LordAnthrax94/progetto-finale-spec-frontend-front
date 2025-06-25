import { GlobalProvider } from "./context/globalContext"
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ComparePage from "./Pages/ComparePage";
import FavouritePage from "./Pages/FavoritePage";
import PageDetails from "./Pages/PageDetails";
import { NavLink } from "react-router-dom";
import Footer from "./Components/Footer";

function App() {
  

  return (    
      <GlobalProvider>
        <div className="bg-slate-500 min-h-screen flex flex-col">
        <BrowserRouter>
          <nav className="fixed top-0 left-0 w-full z-50 flex justify-end bg-yellow-500 text-black gap-20 p-6 shadow">
            <NavLink to="/" end className="p-1 font-medium">Home</NavLink>
            <NavLink to="/Compara" end className="p-1 font-medium">Compara</NavLink>
            <NavLink to="/Preferiti" end className="p-1 font-medium">I tuoi preferiti</NavLink>            
          </nav>
          <div className="pt-20 flex-1">
            <Routes >            
              <Route path="/" element={<Home />}/>
              <Route path="/Compara" element={<ComparePage />}/>
              <Route path="/Preferiti" element={<FavouritePage />}/>
              <Route path="/Dettagli/:id" element={<PageDetails />}/>
            </Routes>
          </div>          
        </BrowserRouter>
        </div>
        <Footer />
      </GlobalProvider>    
  )
}

export default App
