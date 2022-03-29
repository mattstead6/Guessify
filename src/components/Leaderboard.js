import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STAT_URL, useDocumentTitle, } from "./utilites";




function Leaderboard () {
    useDocumentTitle("GUESSIFY LEADERBOARD")
    const [scores ,setScores] = useState([]) 

    const navigate = useNavigate()


        const displayBoard = scores.map(score => (
              <tr key={score.id} >
                    <td>{score.username}</td>
                    <td>{score.score} pts</td>
              </tr>  
        ))
    

    useEffect(()=> {
        fetch(STAT_URL)
        .then(resp => resp.json())
        .then(scoreData => setScores(scoreData))
    },[])

    return (
        <div>
        <h3>Leaderboard</h3>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Final Score</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>Sample name</td>
                    <td>50 pts</td>
                </tr>
                {displayBoard}
                </tbody>
            </table>
            <button onClick={()=> navigate("./GameContainer")}>Play Again?</button>
        </div>
    )
}

export default Leaderboard;