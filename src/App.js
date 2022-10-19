import './App.css';

import { Routes, Route, useNavigate } from "react-router-dom"
import {useEffect, useState} from "react"
import GameContainer from './components/GameContainer';
import Leaderboard from './components/Leaderboard';
import Home from './components/Home';
import { AUTH_KEYS } from './utilites';
         
// blank player data
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
  
// TO DO :  clear the local storage token 


  let navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token")

// if access token in local storage, store code in 'token' variable
    if (!token && hash) {
      token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    // ## TODO: implement useContext to broadcast token to components instead of useState
    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  // handle submitting the oepning form to start game
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
  // resets player data to 0, "", etc.
  function resetPlayerData() {
    setPlayerData(resetPlayer);
  }

  function toggleIsHard(){
    setIsHard(()=> !isHard)
    setPlayerData(prev => isHard? {...prev, mode: "Hard"} : {...prev, mode: "Normal"})
  
  }

  return (
    <>
    <div className="App">
    <Routes>
      <Route path="/" element={
          <Home handleSubmit={handleSubmit} 
                setPlayerData={setPlayerData} 
                playerData={playerData} 
                toggleIsHard={toggleIsHard}
                isHard={isHard}
                setIsHard={setIsHard}
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

    {!token ? <a id='login-button' href={`${AUTH_KEYS.AUTH_ENDPOINT}?client_id=${AUTH_KEYS.CLIENT_ID}&redirect_uri=${AUTH_KEYS.REDIRECT_URI}&response_type=${AUTH_KEYS.RESPONSE_TYPE}`}><b>Login to Spotify</b></a>
    : <button onClick={logout}><b>Logout</b></button>}

    
    </div>
 
    </>

  );
}

export default App;