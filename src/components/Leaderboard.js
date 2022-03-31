import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STAT_URL, useDocumentTitle, } from "./utilites";
import GameOver from "./GameOver";
import AnswerList from "./AnswerList";




function Leaderboard ({playerData, correctAnswers, setCorrectAnswers}) {
    const [scores, setScores] = useState([]) 
    const navigate = useNavigate()
    useDocumentTitle("GUESSIFY LEADERBOARD")
    let editedAnswers = correctAnswers.slice(1);
    
    useEffect(()=> {
        fetch(STAT_URL)
        .then(resp => resp.json())
        .then(scoreData => {
            const sortedScores = scoreData.sort((a, b) => {
                return b.score - a.score
            })
            setScores(sortedScores)
        })
    },[])

    

    const displayBoard = scores.map(score => (
        <tr key={score.id} >
            <td><li>{score.username}</li></td>
            <td>{score.score}</td>
        </tr>  
    ))


    return (
        <div >  
       {playerData.totalplayed !== 0 ? <GameOver scores={scores} playerData={playerData}/> : null}
       <img style={{maxWidth: playerData.totalplayed === 0? '40%':'30%'}} src='/images/leaderboard.png' alt='Leaderboard'/>
            <ol  className="game-over-info">
            <table id='lb' className="leaderboard-table">
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

            {playerData.totalplayed !== 0 ? <AnswerList correctAnswers={editedAnswers} /> : null }
             <button onClick={()=> navigate("/")}>{playerData.totalplayed === 0 ? <b>Play Game</b> : <b>Play Again</b>}</button>

        </div>
    )
}

export default Leaderboard;