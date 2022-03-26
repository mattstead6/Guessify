import {link, useLocation} from "react-router-dom";

function GameContainer() {
    const location = useLocation();


    console.log(location)
    return (
        <div>
            <h2>Success, You are in the game container</h2>
            <p>Your name: {location.state.name}</p>
            <p>Your chosen genre: {location.state.genre}</p>
            
        </div>
    )
}

export default GameContainer