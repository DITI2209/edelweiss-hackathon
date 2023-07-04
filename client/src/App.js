import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';


import Options from './pages/Options';
import SplashScreen from './pages/Splash';


function App() {
  
  

  

  
  return (
    <div className="App">
    
    
    <BrowserRouter>

      <div style={{marginTop:'0%'}}>

        <Routes>

        <Route 
            path="/" 
            element={<SplashScreen />} 
          />
          <Route 
            path="/home" 
            element={<Home />} 
          />

         
            <Route 
            path="/splash" 
            element={<SplashScreen />} 
          />
            <Route 
            path="/options" 
            element={<Options />} 
          />
          
        

          
         
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
