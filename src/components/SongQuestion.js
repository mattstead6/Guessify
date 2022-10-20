import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function SongQuestion({ setPlayerData, token, setCorrectAnswers, isHard, gameTimer }) {



    const [correctSong, setCorrectSong] = useState({})
    const [allSongs, setAllSongs] = useState([])
    const [timeRemaining, setTimeRemaining] = useState(isHard ? 5 : 10);
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    let randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length))

    console.log(gameTimer)

    useEffect(() => {

        if (!(allSongs.find(song => song.preview_url))) getSongs()
        const timeID = setTimeout(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1)
            }
            else {
                setCorrectAnswers((prev) => [...prev, { song: correctSong, wasCorrect: false }])
                getSongs()
                    .then(setTimeRemaining(isHard ? 5 : 10))
                setPlayerData(prev => ({ ...prev, totalplayed: prev.totalplayed + 1 }))
            }
        }, 1000);
        return () => { clearTimeout(timeID) }

    }, [timeRemaining])

    function getSongs() {
        return fetch(isHard ? `https://api.spotify.com/v1/search?q=%25${randomChar}%25&type=track&limit=7&offset=${Math.floor(Math.random() * 1000)}`
            : `https://api.spotify.com/v1/search?q=%25${randomChar}%25&type=track&limit=4&offset=${Math.floor(Math.random() * 1000)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then(data => handleSongBatch(data.tracks.items))
    }


    function handleSongBatch(songs) {
        setCorrectSong(() => songs.find(song => song.preview_url))
        setAllSongs(songs.sort((a, b) => 0.5 - Math.random()))
        setTimeRemaining(isHard ? 5 : 10)

    }



    function handleAnswer(e, answer) {
        if (!e.target.disabled) {
            setTimeRemaining(isHard ? 5 : 10)
            if (answer === correctSong.name) {
                setPlayerData((playerData) => ({ ...playerData, score: playerData.score + 5, totalcorrect: playerData.totalcorrect + 1, totalplayed: playerData.totalplayed + 1 }))
                setCorrectAnswers((prev) => [...prev, { song: correctSong, wasCorrect: true }])
            }
            else {
                setPlayerData((playerData) => ({ ...playerData, totalplayed: playerData.totalplayed + 1 }))
                setCorrectAnswers((prev) => [...prev, { song: correctSong, wasCorrect: false }])
            }
            getSongs()
        }
        e.target.disabled = true
    }



    const multipleChoice = allSongs.map(song => (
        // <li style={{listStyleType: "none"}} key={song.id} ><button onClick={e => handleAnswer(e.target.name)} name={song.name}><b>{song.name}</b></button></li> ) )
        <button style={{ listStyleType: "none" }} key={song.id} onClick={e => handleAnswer(e, song.name)} ><b>{song.name}</b></button>))

    if (correctSong) return (
        <>
            <h2>Guess the name of this song..</h2>
            <h3>{gameTimer}</h3>
            <img style={{ maxWidth: '20%' }} src='/images/guessify-mascot1.gif' alt='Dancing mascot'></img>
            <audio autoPlay controls src={correctSong.preview_url} title='Nice try bucko!' ></audio>

            <ul style={{ padding: '0' }} >
                {multipleChoice}
            </ul>
            {timeRemaining === 1 ? <h3>{timeRemaining} second left</h3> : <h3>{timeRemaining} seconds left</h3>} 
        </>
    )

    else {
        return <h2>Loading...</h2>
    }
}

export default SongQuestion