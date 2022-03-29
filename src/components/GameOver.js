

function GameOver() {

    return (
        <>
        <h2>Game Over</h2>
        <p>You knew {"numCorrect"} out of {"numSongs"} songs!</p>
        <p>And you placed {"leaderboardPosition"}th on the Leaderboard!</p>

        </>
    )
}

export default GameOver