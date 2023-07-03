import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/Login';
//import Navbar from './components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from './reducers/authReducer';
import { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import Investment from './pages/Investment';
import Profile from './pages/Profile';
import InvestmentDetail from './pages/InvestmentDetail';
import Portfolio from './pages/Portfolio';
import Form from './pages/Blog';
import { Chat } from './pages/Chatbot';
import Options from './pages/Options';

function App() {
  const logged_in=useSelector((state)=>state.auth.login);
  const dispatch=useDispatch()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
    
      dispatch(authLogin(JSON.parse(loggedInUser)))
    }
  }, []);

  
  return (
    <div className="App">
    
    <Chat/>
    <BrowserRouter>

      <div style={{marginTop:'0%'}}>

        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />

          <Route 
            path="/investments" 
            element={<Investment />} 
          />
            <Route 
            path="/options" 
            element={<Options />} 
          />
           <Route 
            path="/profile" 
            element={<Profile />} 
          />
           <Route 
            path="/investmentdetail" 
            element={<InvestmentDetail />} 
          />
          <Route 
            path="/portfolio" 
            element={<Portfolio />} 
          />
            <Route 
            path="/blog" 
            element={<Form />} 
          />

          <Route 
            path="/chat" 
            element={<Chat />} 
          />

          {!logged_in?
           <Route 
            path="/login" 
            element={<Login />} 
          />
          :
          <></>}

          
         
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
