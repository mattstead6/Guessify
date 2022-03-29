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
import GameContainer from './components/GameContainer';
import Leaderboard from './components/Leaderboard';
import Home from './components/Home';

         


function App() {
  const [token, setToken] = useState("")
      //variables needed for authorization:
  const CLIENT_ID = "ad207e953e224110b18641630a57a298" 
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"


  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token")


    if (!token && hash) {
      token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }


  let params = useParams();


  // game details i.e player name as well as chosen genres and scored points need 
  // to be stateful data so that when player completes the game we can post data to leader board
  const resetPlayer = {username: "", score: 0, totalcorrect: 0, totalplayed:0}
  const [playerData ,setPlayerData] = useState(resetPlayer) 

  function handleSubmitPlayerStats(playerData) {
    fetch(STAT_URL, fetchConfigObj('POST', playerData))
  }

  let navigate = useNavigate();

  function handleHomeClick() {
    navigate("./")
    setPlayerData({username: "", score: 0, totalcorrect: 0, totalplayed:0})
}


  
  function handleSubmit(e){
    e.preventDefault();
    const {target: {name}} = e
    console.log(e.target);
    navigate("./GameContainer", {state: {name: name.value, genre: "classical", token: token}})
  }


  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home handleSubmit={handleSubmit} setPlayerData={setPlayerData} playerData={playerData}/>} />
      <Route path="GameContainer" element={<GameContainer token={token} playerData={playerData} setPlayerData={setPlayerData}/>} />

      <Route path="Leaderboard" element={<Leaderboard />} />
    </Routes>

    {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
    : <button onClick={logout}>logout</button>}
    
   <button onClick={getUserData}>get user data</button>
   <button onClick={handleHomeClick} >Home</button>

    </div>

  );
}

export default App;
