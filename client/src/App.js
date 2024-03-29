//import './App.css';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import Main from "./Main";
import {HashRouter} from "react-router-dom";
import {CookiesProvider} from "react-cookie";


function App() {

  return (
    <div className="App">
        {/*
        HashRouter pour faire des links entre les balises
         CookiesProvider pour utiliser les cookies entre les balises
         */}
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
