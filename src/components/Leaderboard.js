import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STAT_URL, useDocumentTitle, } from "./utilites";
import GameOver from "./GameOver";
import AnswerList from "./AnswerList";




function Leaderboard ({playerData, correctAnswers, setCorrectAnswers, isHard}) {
    const [scores, setScores] = useState([]) 
    const [category, setCategory] = useState("All")
    const navigate = useNavigate()
    useDocumentTitle("GUESSIFY LEADERBOARD")
    let editedAnswers = correctAnswers.slice(1);
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


    function handleCategory(e){
        console.log(e.target.value)
        let value =e.target.value
        setCategory(value)
    }

    
    const filteredItems = category==='All'?scores:scores.filter((player) => player.mode === category)
    

    const displayBoard = filteredItems.map(score => (
        <tr key={score.id} >
            <td><li>{score.username}</li></td>
            <td>{score.score}</td>
            <td>{score.mode}</td>
        </tr> 
    ))
    
    // function filteredShit(category){
    //     displayBoard.filter((player) => player.mode === category)
    // } 


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
                    <th>Difficulty</th>
                    <select onChange={handleCategory}>
                        <option>All</option>
                        <option>Normal</option>
                        <option>Hard</option>
                    </select>
                </tr>
                </thead>
                <tbody>
                    
                        {displayBoard}
                    
                </tbody>
            </table>
            </ol>

            <AnswerList correctAnswers={editedAnswers} />
             <button onClick={()=> navigate("/")}>{playerData.totalplayed === 0 ? <b>Play Game</b> : <b>Play Again</b>}</button>

        </div>
    )
}

export default Leaderboard;