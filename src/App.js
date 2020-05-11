import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './containers/home/Home';
import { useTranslation } from "react-i18next";

function App() {
 

function handleclick(lang){
i18n.changeLanguage(lang);
}




  return (
    <div className="App">
      <nav style={{ width: "100%", padding: "2em", background: "grey" }}>
        <button onClick={() => handleclick("en")}>English</button>
        <button onClick={() => handleclick("hi")}>Hindi</button>
      </nav>
      <p>{t("my translated text")}</p>
      <Home></Home>
    </div>
  );
}

export default App;
