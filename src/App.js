import './App.css';
import Game from './components/Game'
import { useCookies } from "react-cookie"
import { useState } from 'react';
import Options from './components/Options';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies([])
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  //Clear cookies and reload page
  function reset(){
    for(const c in cookies){
      removeCookie(c.toString())
    }
    window.location.reload()
  }

  function toggleOptions(){
    if(isOptionsOpen){
      document.querySelector(".options-background").classList.add("on-remove")
      setTimeout(() => {
        setIsOptionsOpen(!isOptionsOpen)
      }, 250);
    } else {
      setIsOptionsOpen(!isOptionsOpen)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3 className="title">rgb</h3>
        <button className="header-button" onClick={toggleOptions}><h3>options</h3></button>
        <button className="header-button" onClick={reset}><h3>reset</h3></button>
      </header>
      <main>
        {isOptionsOpen ? <Options  dismiss={toggleOptions}/> : null}
        <Game />
      </main>
    </div>
  );
}

export default App;
