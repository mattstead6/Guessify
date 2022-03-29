import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { STAT_URL, } from "./utilites";
import GameOver from "./GameOver";




function Leaderboard () {
    const [scores ,setScores] = useState([]) 

    const navigate = useNavigate()


        const displayBoard = scores.map(score => (
              <tr key={score.id} >
                    <td>{score.username}</td>
                    <td>{score.score}</td>
              </tr>  
        ))
    

    useEffect(()=> {
        fetch(STAT_URL)
        .then(resp => resp.json())
        .then(scoreData => setScores(scoreData))
    },[])

    return (
        <div>

        <GameOver/>
        <h3>Leaderboard</h3>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Final Score</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>Sample name</td>
                    <td>Rock</td>
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