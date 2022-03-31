import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { useDocumentTitle } from "./utilites";





function Home({handleSubmit, setPlayerData, playerData, resetPlayerData, toggleIsHard, isHard}) {
    useDocumentTitle("GUESSIFY HOME")
    useEffect(() => (
        setPlayerData(prev => isHard? {...prev, mode: "Hard"} : {...prev, mode: "Normal"}),
        resetPlayerData()
    ),[])

    // function handleStartGame(e) {
    //     if (pplayerData.username)
    // }

    const navigate = useNavigate();




// function openShit() {
//    window.open("");
// }

    return (
        <> 

      
                <button>Instructions</button>
                
           
           <img style={{maxWidth: '30%'}} src="/images/GUESSIFY.png" alt='Guessify logo'/>
            <h2>Play Now</h2>

            <form onSubmit={handleSubmit}>
                <input onChange={e => setPlayerData(prev => ({...prev, username: e.target.value }))} type="text" id="name" name="name" placeholder='Your name here...' value={playerData.username}></input>
                <button type="submit"><b>Start Game</b></button>
            </form>       
            <button onClick={() => navigate("./Leaderboard")}><b>Leaderboard</b></button>
            {isHard ? <button className="normal" onClick={toggleIsHard}>Normal Mode</button>
            :
            <button className= "hard" onClick={toggleIsHard}>Hard Mode</button>}
        </>
    )
}

export default Home;







// correctAnswers.map(answer => (
//     !!answer.name ?

//    ( <li>
//         <b>Name: </b>{answer.name}, <b>artist: </b>{answer.artists[0].name}, 
//         <a
//         className="spotify-link"
//         href={"https://open.spotify.com/track/" + answer.id}>open in spotify</a>
//     </li>) : null))