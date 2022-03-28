
import { useState, useEffect } from "react";
import {link, Outlet, useLocation, useParams} from "react-router-dom";
// import SongQuestion from "./SongQuestion";



function GameContainer() {
    const location = useLocation();
    const [songList, setSongList] = useState([]);

    useEffect(() => { //retrieves initial song data
        getSongs();
        
    }, [])


    let params = useParams();
    console.log(location)

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    let randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length))



    function getSongs() {
        fetch(`https://api.spotify.com/v1/search?q=%25${randomChar}%25&type=track&limit=4&offset=${Math.floor(Math.random() * 1000)}`, 
        {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + location.state.token
            }})
            .then( res => res.json())
            .then( data => setSongList(data.tracks.items))
    }
    console.log(songList)
   
    
    



    
    return (
        <div>
            <h2>Success, You are in the game container</h2>
            <p>Your name: {location.state.name}</p>
            <p>Your chosen genre: {location.state.genre}</p>

            {/* <SongQuestion currentSong={'currentSong'} ramdomSongs={'randomSongs'} /> */}
            <p>your token is {location.state.token}</p>
            
            <h3>{'some countdown'} seconds left before next songQuestion is displayed</h3>
            <Outlet />
        </div>
    )
}

export default GameContainer