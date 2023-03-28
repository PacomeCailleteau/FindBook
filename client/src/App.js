//import logo from './logo.svg';
//import './App.css';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import Main from "./Main";
import {HashRouter} from "react-router-dom";
import {useState} from "react";
import {CookiesProvider} from "react-cookie";


function App() {

  return (
    <div className="App">
        <HashRouter>
            <CookiesProvider>
                <AppHeader/>
                <Main/>
                <AppFooter/>
            </CookiesProvider>
        </HashRouter>
    </div>
  );
}

export default App;
