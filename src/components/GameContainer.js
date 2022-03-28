
import { useState, useEffect } from "react";
import {Link, Outlet, useLocation, useParams} from "react-router-dom";
import SongQuestion from "./SongQuestion";



function GameContainer({token}) {
    const location = useLocation();

    const [correctSong ,setCorrectSong] = useState({}) 
    const [allSongs ,setAllSongs] = useState([]) 
    const [timeRemaining, setTimeRemaining] = useState(10);
    const [onAnswered ,setOnAnswered] = useState(false) 
    // useEffect(()=>{
    //     the intial get request for the songs
    //     expecting this data to be multiple songs
    //     ex aply it to song question component.
    //     set a timer so that the user has 10 sec to answer if not move to next song. 
    //     as well as reset timer
    //     the dependency for this useEffect would be the timer when it hits 0
    // })



    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    let randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length))

   
    useEffect(() => { //retrieves initial song data
       if (!allSongs.find(song => song.preview_url)) getSongs()
       const timeID = setTimeout(() => {
        if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1)
        }
        else{
          setTimeRemaining(10)
          setOnAnswered(false)
        }
      },1000) ;
      return () => {clearTimeout(timeID)}  
        
    }, [allSongs, timeRemaining, onAnswered])
    

    
    
    function getSongs() {
        fetch(`https://api.spotify.com/v1/search?q=%25${randomChar}%25&type=track&limit=4&offset=${100 + Math.floor(Math.random() * 1000)}`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }})
            .then( res => res.json())
            .then( data => handleSongBatch(data.tracks.items))
        }
        
        
        function handleSongBatch(songs) {
            

            setCorrectSong(() => songs.find(song => song.preview_url))
            setAllSongs(songs)
    }
    



    
    return (
        <div>
            <h2>Success, You are in the game container</h2>
            <p>Your name: {location.state.name}</p>

            <SongQuestion correctSong={correctSong} allSongs={allSongs} setOnAnswered={setOnAnswered}/>            
             <h3>{timeRemaining} seconds left before next songQuestion is displayed</h3>


        </div>
    )
}

export default GameContainer