import './App.css';

import { Routes, 
         Route, 
         useNavigate } from "react-router-dom"
import {useEffect, useState} from "react"
import GameContainer from './components/GameContainer';
import Leaderboard from './components/Leaderboard';
import Home from './components/Home';



const resetPlayer = {username: "", score: 0, totalcorrect: 0, totalplayed:0}
 

function App() {
  const [playerData ,setPlayerData] = useState(resetPlayer) 
  const [token, setToken] = useState("")
      //variables needed for suthorization:
  const CLIENT_ID = "ad207e953e224110b18641630a57a298" 
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

 // what is this USE EFFECT DOING!?
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



  // game details i.e player name as well as chosen genres and scored points need 
  // to be stateful data so that when player completes the game we can post data to leader board


  let navigate = useNavigate();

  function handleHomeClick() {
    navigate("./")
    setPlayerData({resetPlayer})
}


  
  function handleSubmit(e){
    e.preventDefault();
    navigate("./GameContainer")
  }



  return (
    <div className="App">

    <Routes>
      <Route path="/" element={<Home handleSubmit={handleSubmit} handleHomeClick={handleHomeClick} setPlayerData={setPlayerData} playerData={playerData}/>} />
      <Route path="GameContainer" element={<GameContainer token={token} playerData={playerData} setPlayerData={setPlayerData}/>} />
      <Route path="Leaderboard" element={<Leaderboard />} />
    </Routes>


    

    {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
    : <button onClick={logout}>logout</button>}
    


    </div>

  );
}

export default App;
