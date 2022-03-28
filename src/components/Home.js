import {useNavigate} from "react-router-dom"

function Home({handleSubmit}) {


    const navigate = useNavigate();

    return (
        <>
            <h2>Welcome to "Guess the Song Name" (title pending...)</h2>
            <form onSubmit={handleSubmit}>
                <label for="name">Name: </label>
                <input type="text" id="name" name="name" placeholder='Your name here...'></input>

                <button type="submit">Start the game!</button>
            </form>
      
            <button onClick={()=> navigate("./Leaderboard")}>Leaderboard</button>
        </>
    )
}

export default Home