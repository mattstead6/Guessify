import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { STAT_URL, } from "./utilites";
import GameOver from "./GameOver";


function Leaderboard ({playerData, correctAnswers}) {
    const [scores, setScores] = useState([]) 
    const navigate = useNavigate()
    console.log(correctAnswers)

    console.log(playerData)
    
    useEffect(()=> {
        fetch(STAT_URL)
        .then(resp => resp.json())
        .then(scoreData => {
            console.log(scoreData)
            const sortedScores = scoreData.sort((a, b) => {
                return b.score - a.score
            })

            console.log(sortedScores)
            setScores(sortedScores)
        })
    },[])

    const displayBoard = scores.map(score => (
        <tr key={score.id} >
            <td><li>{score.username}</li></td>
            <td>{score.score}</td>
        </tr>  
    ))


     function displayCorrectAnswers() {

        const editedAnswers = 
        correctAnswers.map(answer => {
            console.log(answer)
            if (answer.name === undefined)
                return null
            else  {
                return (
                    <li>
                        <b>Name: </b>{answer.name}, <b>artist: </b>{answer.artists.name}, 
                        <a
                        className="spotify-link"
                        href={"https://open.spotify.com/track/" + answer.id}>open in spotify</a>
                    </li>               
                 )}
        })
       
    }


    console.log(scores)
    return (
        <div>  
       {playerData.totalplayed !== 0 ? <GameOver playerData={playerData}/> : null}
        <h3>Leaderboard</h3>
            <ol>
            <table className="leaderboard-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Final Score</th>
                </tr>
                </thead>
                <tbody>
                    
                        {displayBoard}
                    
                </tbody>
            </table>
            </ol>
            <ul>
                <li>Song List: </li>
                {displayCorrectAnswers()}
            </ul>
            <button onClick={()=> navigate("../GameContainer")}>Play Again?</button>
        </div>
    )
}

export default Leaderboard;