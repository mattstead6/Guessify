import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { useDocumentTitle } from "./utilites";





function Home({handleSubmit, setPlayerData, playerData, resetPlayerData, toggleIsHard, isHard, setIsHard}) {

    const [instructions, setInstructions] = useState(false)

    useDocumentTitle("GUESSIFY HOME")
    useEffect(() => (
        resetPlayerData()
    ),[])

    // function handleStartGame(e) {
    //     if (pplayerData.username)
    // }

    const navigate = useNavigate();

        function handleInstructions(){
            setInstructions(( ) => !instructions)
        }

       

// function openShit() {
//    window.open("");
// }

    return (
        <> 

      

                <button onClick={handleInstructions}><b>Instructions</b></button>
                {instructions ? 
                <div>
                <p className="instructions">This is a simple game, but to be ranked in the top 5 is no simple task. </p>
                <p className="instructions">  <button onClick={()=>setIsHard(false)}><b>Normal Mode</b></button> Guess the song you hear. You have 10 seconds. There are 4 options to select from.</p>
                  <p className="instructions">  <button onClick={()=>setIsHard(true)} className="normal"><b>Hard Mode</b></button> Guess the song you hear. You have 5 seconds. There are 7 options to select from.</p>
               </div>
                :
                null
                }

                
           
           <img style={{maxWidth: '60%'}} src="/images/GUESSIFY.png" alt='Guessify logo'/>
            <h2>Play Now</h2>

            <form onSubmit={handleSubmit}>
                <input onChange={e => setPlayerData(prev => ({...prev, username: e.target.value }))} type="text" id="name" name="name" placeholder='Your name here...' value={playerData.username}></input>
                <button type="submit"><b>Start Game</b></button>
            </form>       
            <button onClick={() => navigate("./Leaderboard")}><b>Leaderboard</b></button>

            {isHard ? <button className="normal" onClick={toggleIsHard}><b>Click For Normal Mode</b></button>
            :
            <button className= "hard" onClick={toggleIsHard}><b>Click For Hard Mode</b></button>}

        </>
    )
}

export default Home;

