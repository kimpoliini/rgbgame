import './App.css';
import Game from './components/Game'
import Kofi from './components/Kofi'
import { useState } from 'react';
import Options from './components/Options';

function App() {

  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  function toggleOptions() {
    if (isOptionsOpen) {
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
        <h3 className="title">RGB Inc</h3>
        <Kofi />
        <button className="header-button" onClick={toggleOptions}><h3>Options</h3></button>
      </header>
      <main>
        {isOptionsOpen ? <Options dismiss={toggleOptions} /> : null}
        <Game />
      </main>
    </div>
  );
}

export default App;
