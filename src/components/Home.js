import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { useDocumentTitle } from "./utilites";
import logo from "../GUESSIFY.png";


function Home({handleSubmit, setPlayerData, playerData, resetPlayerData}) {
    useDocumentTitle("GUESSIFY HOME")
    useEffect(() => (
        resetPlayerData()
    ),[])

    const navigate = useNavigate();

    return (
        <> 
            <h2>Welcome to "Guess the Song Name" (title pending...)</h2>
            <form onSubmit={handleSubmit}>
                <label for="name">Name: </label>
                <input onChange={e => setPlayerData(prev => ({...prev, username: e.target.value }))} type="text" id="name" name="name" placeholder='Your name here...' value={playerData.username}></input>
                <button type="submit">Start the game!</button>
            </form>       
            <button onClick={() => navigate("./Leaderboard")}>Leaderboard</button>
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