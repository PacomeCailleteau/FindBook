//import logo from './logo.svg';
//import './App.css';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import Main from "./Main";
import {HashRouter} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <HashRouter>
            <AppHeader/>
            <Main/>
            <AppFooter/>
        </HashRouter>
    </div>
  );
}

export default App;
