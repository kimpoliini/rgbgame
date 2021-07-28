import './App.css';
import Game from './components/Game'
import { useCookies } from "react-cookie"

function App() {

  const [cookies, setCookie, removeCookie] = useCookies([])
  
  //Clear cookies and reload page
  function reset(){
    for(const c in cookies){
      removeCookie(c.toString())
    }
    window.location.reload()
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>rgb</h3>
        <button className="reset" onClick={reset}><h3>reset</h3></button>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;
