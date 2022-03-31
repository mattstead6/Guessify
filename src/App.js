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
    totalplayed: 0,
    mode: ''
  }

function App() {
  const [token, setToken] = useState("")
  const [playerData ,setPlayerData] = useState(resetPlayer)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [isHard, setIsHard] = useState(false)
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

  
  function handleSubmit(e){
    if (token) {
    e.preventDefault();
    playerData.username === ""? alert("Please enter a name!") :
    navigate("./GameContainer")
    }
    else{
      alert('Please login to your spotify below')
    }

  }

  function resetPlayerData() {
    setPlayerData(resetPlayer);
  }

  function toggleIsHard(){
    setIsHard(()=> !isHard)
  }

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={
          <Home handleSubmit={handleSubmit} 
                setPlayerData={setPlayerData} 
                playerData={playerData} 
                toggleIsHard={toggleIsHard}
                isHard={isHard}
                resetPlayerData={resetPlayerData}/>} />
      <Route path="GameContainer" element={
          <GameContainer token={token} 
                         playerData={playerData} 
                         setPlayerData={setPlayerData} 
                         isHard={isHard}
                         resetPlayerData={resetPlayerData} 
                         setCorrectAnswers={setCorrectAnswers}/>} />
      <Route path="Leaderboard" element={<Leaderboard isHard={isHard} playerData={playerData} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers}/>} />
    </Routes>

    {!token ? <a id='login-button' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}><b>Login to Spotify</b></a>
    : <button onClick={logout}><b>Logout</b></button>}
    
    </div>

  );
}

export default App;