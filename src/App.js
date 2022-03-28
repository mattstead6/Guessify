import './App.css';
import { BrowserRouter, Routes, Route, Link, Outlet, useParams, useNavigate } from "react-router-dom"
import { fetchConfigObj, STAT_URL } from './components/utilites';

function App() {
  let params = useParams();
  console.log(params)

  // game details i.e player name as well as chosen genres and scored points need 
  // to be stateful data so that when player completes the game we can post data to leader board
  // const resetPlayer = {username: "", genre: "", score: ""}
  // const [playerData ,setPlayerData] = useState(resetPlayer) 

  function handleSubmitPlayerStats(playerData) {
    fetch(STAT_URL, fetchConfigObj('POST', playerData))
  }

  let navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    //console.log(e.target.name.value);
    navigate("/GameContainer", {state: {name: e.target.name.value, genre: "rock"}})
  }

  return (
    <div className="App">
      <h2>Welcome to "Guess the Song Name" (title pending...)</h2>
      <form onSubmit={handleSubmit}>
        <label for="name">Name: </label>
        <input type="text" id="name" name="name" placeholder='Your name here...'></input>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="rock" id="inlineRadio1" value="rock"/>
          <label className="form-check-label" for="inlineRadio1">Rock</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="pop" id="inlineRadio2" value="pop"/>
          <label className="form-check-label" for="inlineRadio2">Pop</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="classical" id="inlineRadio3" value="classical"/>
          <label className="form-check-label" for="inlineRadio3">Classical</label>
        </div>
        <button type="submit">Start the game!</button>
      </form>
    <button onClick={()=> navigate("./Leaderboard")}>Leaderboard</button>
    </div>
  );
}

export default App;
