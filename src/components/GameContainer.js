
import { useState, useEffect } from "react";

import SongQuestion from "./SongQuestion";
import { fetchConfigObj, STAT_URL } from "./utilites";
import {useNavigate} from "react-router-dom"


function GameContainer({setPlayerData, token, playerData}) {

    //full gametimer, player has 60 seconds to guess as many songs as possible
    const [gameTimer ,setGameTimer] = useState(60) 
    const [gameOver ,setGameOver] = useState(false) 
    const navigate = useNavigate()






    console.log('game container render')
   
    useEffect(() => { //retrieves initial song data
       const timeID = setTimeout(() => {
        if (gameTimer > 0) {
        setGameTimer(gameTimer - 1)
        console.log(gameTimer)
        }
        else{
            setGameOver(true)
            handlePOSTRecord()
        }
      },1000) ;
      return () => {clearTimeout(timeID)}  
        
    }, [gameTimer])

    
    

    

    function handlePOSTRecord(){
       fetch(STAT_URL, fetchConfigObj('POST', playerData))
       .then(resp => {if (resp.ok) navigate("/Leaderboard")} )

    }

    



    
    return (
        <div>
            <h2>Success, You are in the game container</h2>

            <p>Your name: {playerData.username}</p>




            {!gameOver? <SongQuestion token={token} setPlayerData={setPlayerData} /> : null}
            

        </div>
    )
}

export default GameContainer