import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { useDocumentTitle } from "./utilites";
import logo from "../GUESSIFY.png";


function Home({handleSubmit, setPlayerData, playerData, resetPlayerData}) {
    useDocumentTitle("GUESSIFY HOME")
    useEffect(() => (
        resetPlayerData()
    ),[])

    // function handleStartGame(e) {
    //     if (pplayerData.username)
    // }

    const navigate = useNavigate();

    return (
        <> 
           <img style={{maxWidth: '30%'}} src={logo} alt='Guessify logo'/>
            <h2>do you know your shit?...</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={e => setPlayerData(prev => ({...prev, username: e.target.value }))} type="text" id="name" name="name" placeholder='Your name here...' value={playerData.username}></input>
                <button type="submit"><b>Start Game</b></button>
            </form>       
            <button onClick={() => navigate("./Leaderboard")}><b>Leaderboard</b></button>
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