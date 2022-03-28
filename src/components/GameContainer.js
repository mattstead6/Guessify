
import { useState, useEffect } from "react";
import {link, useLocation, useParams} from "react-router-dom";
import SongQuestion from "./SongQuestion";



function GameContainer() {
    const location = useLocation();
    const [songList, setSongList] = useState([]);

    // useEffect(()=>{
    //     the intial get request for the songs
    //     expecting this data to be multiple songs
    //     ex aply it to song question component.
    //     set a timer so that the user has 10 sec to answer if not move to next song. 
    //     as well as reset timer
    //     the dependency for this useEffect would be the timer when it hits 0
    // })


    let params = useParams();
    console.log(location)

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    let randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length))

    useEffect(() => { //retrieves initial song data
        getSongs();
        
    }, [])


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

            <SongQuestion currentSong={'currentSong'} ramdomSongs={'randomSongs'} />
            <p>your token is {location.state.token}</p>
            
             <h3>{'some countdown'} seconds left before next songQuestion is displayed</h3>

        </div>
    )
}

export default GameContainer