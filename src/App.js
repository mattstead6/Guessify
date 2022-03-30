import './App.css';

import { Routes, Route, useNavigate } from "react-router-dom"
import {useEffect, useState} from "react"
import GameContainer from './components/GameContainer';
import Leaderboard from './components/Leaderboard';
import Home from './components/Home';

         
  const resetPlayer = {
    username: "", 
    score: 0,  
    totalcorrect: 0, 
    totalplayed: 0
  }

function App() {
  const [token, setToken] = useState("")
  const [playerData ,setPlayerData] = useState(resetPlayer)
  const [correctAnswers, setCorrectAnswers] = useState([])
      //variables needed for authorization:
  const CLIENT_ID = "ad207e953e224110b18641630a57a298" 
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  let navigate = useNavigate();

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
  

//   function handleHomeClick() {
//     navigate("./")
//     setPlayerData({username: "", score: 0, totalcorrect: 0, totalplayed:0})
// }
  
  function handleSubmit(e){
    e.preventDefault();
    playerData.username === ""? alert("Please enter a name!") :
    navigate("./GameContainer")
  }

  function resetPlayerData() {
    setPlayerData(resetPlayer);
  }


  return (
    <div className="App">
    <Routes>
      <Route path="/" element={
          <Home handleSubmit={handleSubmit} 
                setPlayerData={setPlayerData} 
                playerData={playerData} 
                resetPlayerData={resetPlayerData}/>} />
      <Route path="GameContainer" element={
          <GameContainer token={token} 
                         playerData={playerData} 
                         setPlayerData={setPlayerData} 
                         resetPlayerData={resetPlayerData} 
                         setCorrectAnswers={setCorrectAnswers}/>} />
      <Route path="Leaderboard" element={<Leaderboard playerData={playerData} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers}/>} />
    </Routes>

    {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
    : <button onClick={logout}>logout</button>}
    
    </div>

  );
}

export default App;