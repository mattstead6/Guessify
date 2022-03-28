import { useEffect } from "react";
import {link, useLocation} from "react-router-dom";
import SongQuestion from "./SongQuestion";

function GameContainer() {
    const location = useLocation();

    // useEffect(()=>{
    //     the intial get request for the songs
    //     expecting this data to be multiple songs
    //     ex aply it to song question component.
    //     set a timer so that the user has 10 sec to answer if not move to next song. 
    //     as well as reset timer
    //     the dependency for this useEffect would be the timer when it hits 0
    // })


    console.log(location)
    return (
        <div>
            <h2>Success, You are in the game container</h2>
            <p>Your name: {location.state.name}</p>
            <p>Your chosen genre: {location.state.genre}</p>
            <SongQuestion currentSong={'currentSong'} ramdomSongs={'randomSongs'} />
            
             <h3>{'some countdown'} seconds left before next songQuestion is displayed</h3>

        </div>
    )
}

export default GameContainer