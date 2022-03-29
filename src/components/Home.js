import {useNavigate} from "react-router-dom"

function Home({handleSubmit, setPlayerData, playerData }) {

    

    const navigate = useNavigate();

    return (
        <>
            <h2>Welcome to "Guess the Song Name" (title pending...)</h2>
            <form onSubmit={handleSubmit}>
                <label for="name">Name: </label>
                <input onChange={e => setPlayerData(prev => ({...prev, username: e.target.value }))} type="text" id="name" name="name" placeholder='Your name here...' value={playerData.username}></input>

                <button type="submit">Start the game!</button>
            </form>
      
            <button onClick={()=> navigate("./Leaderboard")}
            >Leaderboard</button>
        </>
    )
}

export default Home