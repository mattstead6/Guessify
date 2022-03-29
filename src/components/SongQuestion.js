import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function SongQuestion({setPlayerData, token, correctAnswers, setCorrectAnswers}){

    console.log('songQuestion rerender')

    // question timer moved into songQuestion for bug purposes and to make it more modular
    const [correctSong ,setCorrectSong] = useState({}) 
    const [allSongs ,setAllSongs] = useState([]) 
    const [timeRemaining, setTimeRemaining] = useState(10);
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    let randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length))

    useEffect(() => { //retrieves initial song data
        if (!allSongs.find(song => song.preview_url)) getSongs()
        const timeID = setTimeout(() => {
         if (timeRemaining > 0) {
         setTimeRemaining(timeRemaining - 1)
         }
         else{

           getSongs()
           .then(setTimeRemaining(10)) 
           setPlayerData(prev => ({...prev, totalplayed: prev.totalplayed + 1})) 
         }
       },1000) ;
       return () => {clearTimeout(timeID)}  
         
     }, [timeRemaining])
 
   

     function getSongs() {
       return fetch(`https://api.spotify.com/v1/search?q=%25${randomChar}%25&type=track&limit=4&offset=${Math.floor(Math.random() * 1000)}`, 
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
        }



    function handleAnswer(answer) {
        getSongs()
        setTimeRemaining(10)
        if (answer === correctSong.name){
            setPlayerData(prev => ({...prev, score: prev.score + 5,totalcorrect: prev.totalcorrect + 1,totalplayed: prev.totalplayed + 1}))
        }
        else{
            setPlayerData(prev => ({...prev, totalplayed: prev.totalplayed + 1}))
        }
    }





    // array of answers made up of current song and 3 random songs
    const multipleChoice = allSongs.map(song => (
    <li key={song.id} ><button onClick={e => handleAnswer(e.target.name)} name={song.name}>{song.name}</button></li> ) )

     if (correctSong) return (
        <>
        <h2>Guess the name of this song..</h2>
         <iframe src={correctSong.preview_url} title='song' allow="autoplay"></iframe>

           <ul>
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