import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/login';
import HomePage from './Pages/homePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home-page" element={<HomePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
