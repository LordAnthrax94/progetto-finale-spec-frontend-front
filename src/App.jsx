import { GlobalProvider } from "./context/globalContext"
import { BrowserRouter } from "react-router-dom";

function App() {
  

  return (    
      <GlobalProvider>
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Compara" element={<ComparePage />}/>
            <Route path="/Preferiti" element={<FavouritePage />}/>
            <Route path="/Dettagli" element={<PageDetails />}/>
          </Routes>

        </BrowserRouter>
      </GlobalProvider>    
  )
}

export default App
