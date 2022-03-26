import { Link, useLocation } from "react-router-dom";

function Leaderboard () {
    return (
        <div>
        <h3>Leaderboard</h3>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Final Score</th>
                </tr>
                <tr>
                    <td>Sample name</td>
                    <td>50 pts</td>
                </tr>
            </table>
        </div>
    )
}

export default Leaderboard;