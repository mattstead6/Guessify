import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STAT_URL, useDocumentTitle, } from "./utilites";
import GameOver from "./GameOver";




function Leaderboard ({playerData, correctAnswers, setCorrectAnswers}) {
    const [scores, setScores] = useState([]) 
    const navigate = useNavigate()
    useDocumentTitle("GUESSIFY LEADERBOARD")
    
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

    useEffect(() => {
        if (correctAnswers[0] === {}){
            const editedAnswers = correctAnswers.slice(1);
            setCorrectAnswers(editedAnswers)
        }
    
    },[])

    const displayBoard = scores.map(score => (
        <tr key={score.id} >
            <td><li>{score.username}</li></td>
            <td>{score.score}</td>
        </tr>  
    ))


     function displayCorrectAnswers() {
         
       const editedAnswers = correctAnswers.slice(1);
        editedAnswers.map(answer => {
            console.log(answer)
            if (!!answer.name)
                return (
                    <li>
                        <b>Name: </b>{answer.name}, <b>artist: </b>{answer.artists.name}, 
                        {/* <a
                        className="spotify-link"
                        href={"https://open.spotify.com/track/" + answer.id}>open in spotify</a> */}
                    </li>               
                 )
                else
                    return null;
            }
        )
       
    }


    console.log(scores)
    return (
        <div>  
       {playerData.totalplayed !== 0 ? <GameOver scores={scores} playerData={playerData}/> : null}
       <img style={{maxWidth: playerData.totalplayed === 0? '40%':'30%'}} src='/images/leaderboard.png' alt='Leaderboard'/>
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
                {() =>displayCorrectAnswers}
            </ul>
            <button onClick={()=> navigate("/")}>{playerData.totalplayed === 0 ? <b>Play Game</b> : <b>Play Again</b>}</button>
        </div>
    )
}

export default Leaderboard;