import './App.css';
import { fetchConfigObj, STAT_URL } from './components/utilites';
import { BrowserRouter, 
         Routes, 
         Route, 
         Link, 
         Outlet, 
         useParams, 
         useNavigate } from "react-router-dom"
import {useEffect, useState} from "react"
// import GameContainer from './components/GameContainer';

         


function App() {
  const [token, setToken] = useState("")
      //variables needed for suthorization:
  const CLIENT_ID = "ad207e953e224110b18641630a57a298" 
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"


  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token")
    console.log(window.location)

    if (!token && hash) {
      token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
  }
  , [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

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
    const {target: {name}} = e
    console.log(e.target);
    navigate("/GameContainer", {state: {name: name.value, genre: "classical", token: token}})
  }

  function toggleGenre(e) {
console.log(e)
e.target.className= " active";
  }


  return (
    <div className="App">
      <h2>Welcome to "Guess the Song Name" (title pending...)</h2>
      <form onSubmit={handleSubmit}>
        <label for="name">Name: </label>
        <input type="text" id="name" name="name" placeholder='Your name here...'></input>

        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary">
            <input type="radio" name="rock" id="option1" autocomplete="off" onClick={e => toggleGenre(e)}/> Rock
          </label>
          <label className="btn btn-secondary">
            <input type="radio" name="pop" id="option2" autocomplete="off" onClick={e => toggleGenre(e)}/> Pop
          </label>
          <label className="btn btn-secondary">
            <input type="radio" name="classical" id="option3" autocomplete="off" onClick={e => toggleGenre(e)}/> Classical
          </label>
        </div>
        <button type="submit">Start the game!</button>
      </form>
    <button onClick={()=> navigate("./Leaderboard")}>Leaderboard</button>
    {/* <Link to="/Leaderboard">Leaderboard</Link> */}
    {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
    : <button onClick={logout}>logout</button>}
    {/* <div>
      <GameContainer />
    </div> */}
    </div>

  );
}

export default App;
