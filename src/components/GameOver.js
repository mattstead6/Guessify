

function GameOver({playerData}) {

    return (
        <>
        <h2>Game Over</h2>
        <h4>Final Score: {playerData.score} Points </h4>
        <p>You knew {playerData.totalcorrect} out of {playerData.totalplayed} (attempted) songs!</p>
        <p>And you placed {"leaderboardPosition"}th on the Leaderboard!</p>
        </>
    )
}

export default GameOver