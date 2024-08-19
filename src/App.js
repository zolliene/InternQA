import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/login";
import HomePage from "./Pages/homePage";
import AdminHomepage from "./Pages/admin/AdminHomepage";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/home-page-admin" element={<AdminHomepage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
