import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";



let scorrr = 0
function SongQuestion({setPlayerData, token, correctAnswers, setCorrectAnswers, isHard}){



    // question timer moved into songQuestion for bug purposes and to make it more modular
    const [correctSong ,setCorrectSong] = useState({}) 
    const [allSongs ,setAllSongs] = useState([]) 

    
    const [timeRemaining, setTimeRemaining] = useState(isHard? 5 : 10);
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    let randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length))

    useEffect(() => {
        //retrieves initial song data
        if (!allSongs.find(song => song.preview_url)) getSongs()
        const timeID = setTimeout(() => {
         if (timeRemaining > 0) {
         setTimeRemaining(timeRemaining - 1)
         }
         else{
           getSongs()
           .then(setTimeRemaining(isHard? 5 : 10)) 
           setPlayerData(prev => ({...prev, totalplayed: prev.totalplayed + 1})) 
         }
         console.log('loaded song;', correctSong.name)
       },1000) ;
       return () => {clearTimeout(timeID)}  
    
         
     }, [timeRemaining])
 
   
     function getSongs() {
       return fetch(isHard ? `https://api.spotify.com/v1/search?q=%25${randomChar}%25&type=track&limit=7&offset=${Math.floor(Math.random() * 1000)}`
       : `https://api.spotify.com/v1/search?q=%25${randomChar}%25&type=track&limit=4&offset=${Math.floor(Math.random() * 1000)}`, 
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
            setAllSongs(songs.sort((a, b) => 0.5 - Math.random()))
            setCorrectAnswers((prev) => [...prev, correctSong])
            setTimeRemaining(10)
        }

    
        
        function handleAnswer(e, answer) {
            scorrr+=5
            console.log(scorrr)
            setTimeRemaining(isHard ? 10 : 5)

        if (answer === correctSong.name){
            setPlayerData((playerData) => ({...playerData, score: playerData.score + 5,totalcorrect: playerData.totalcorrect + 1,totalplayed: playerData.totalplayed + 1}))
        }
        else{
            setPlayerData((playerData) => ({...playerData, totalplayed: playerData.totalplayed + 1}))
        }
        getSongs()
        // setTimeRemaining(10)
    }


    // array of answers made up of current song and 3 random songs
    const multipleChoice = allSongs.map(song => (
    // <li style={{listStyleType: "none"}} key={song.id} ><button onClick={e => handleAnswer(e.target.name)} name={song.name}><b>{song.name}</b></button></li> ) )
    <button style={{listStyleType: "none"}} key={song.id} onClick={e => handleAnswer(e, song.name)} ><b>{song.name}</b></button> ) )

     if (correctSong) return (
        <>
        <h2>Guess the name of this song..</h2>
        <img style={{maxWidth: '20%'}} src='/images/guessify-mascot1.gif' alt='Dancing mascot'></img>
         <audio autoPlay controls src={correctSong.preview_url} title={correctSong.name} ></audio>

           <ul style={{padding: '0'}} >
          {multipleChoice}
           </ul>
           <h3>{timeRemaining} seconds left</h3>
        </>
    )

    else {
        return <h2>Loading...</h2>
    }
} 

export default SongQuestion