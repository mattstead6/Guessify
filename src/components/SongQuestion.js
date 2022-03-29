import React from "react";


// song question should populate an h2 or h3 that says ' Guess this song'
// a ul with li items for the multiple choice answers
// depending on how data is coming in create an answers array of 4 choices with extracted song names .
// iterate over that to create the li's


function SongQuestion({ correctSong, allSongs, handleAnswer }){
    console.log('songQuestion rerender')


    // array of answers made up of current song and 3 random songs
    const multipleChoice = allSongs.map(song => (
    <li key={song.id} ><button onClick={e => handleAnswer(e.target.name)} name={song.name}>{song.name}</button></li> ) )
    return (
        <>
        <h2>Guess the name of this song..</h2>
         <iframe src={correctSong.preview_url} title='song' allow="autoplay"></iframe>

           <ul>
          {multipleChoice}
           </ul>
        </>
    )
} 

export default SongQuestion