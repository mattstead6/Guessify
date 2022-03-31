import {useEffect, useState} from 'react'


function GameOver({playerData, scores}) {
    const [place, setPlace] = useState(0)
    // below 2 functions finds position on leaderboard based on matching details
    
    function suffixMe(num) {
        const j = num % 10,
          k = num % 100;
        if (j == 1 && k != 11) {
          return `${num}st`;
        } else if (j == 2 && k != 12) {
          return `${num}nd`;
        } else if (j == 3 && k != 13) {
          return `${num}rd`;
        } else {
          return `${num}th`;
        }
      }

        
    function findPlayerPosition(player) {
          
      const num = scores.indexOf(scores.find(score => player.username === score.username && player.score === score.score && player.totalcorrect === score.totalcorrect)) + 1
        return suffixMe(num)
    }

    return (
      <>
        <img style={{maxWidth:'30%'}} src='/images/game over.png' />
          <div className='game-over-info stuff'>

            <h4>Final Score: <b>{playerData.score} Points</b> </h4>
            <p>You knew <b>{playerData.totalcorrect}</b> out of <b>{playerData.totalplayed}</b> (attempted) songs!</p>
            <p>And you placed <b>{findPlayerPosition(playerData)}</b> on the Leaderboard!</p>
          </div>
      </>

    )
}

export default GameOver

