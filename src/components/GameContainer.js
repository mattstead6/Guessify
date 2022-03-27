import {link, useLocation, useParams} from "react-router-dom";
import {useState, useEffect} from "react"


function GameContainer() {
    const location = useLocation();
    const {state: {name, genre, token}} = location
    console.log(location, "name: ", name)
    console.log("genre: ", genre)
    console.log("token: ", token)


    let params = useParams();
  console.log(params)

    useEffect(() => { //retrieves initial sonng data

        fetch(`https://api.spotify.com/v1/search?q=%25f%25&type=track&offset=${Math.floor(Math.random() * 1000)}`, 
        {
            method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + location.state.token
        }})
        .then( res => res.json())
        .then( data => console.log(data))
        
    }, [location.state.token])
   
    
    



    
    return (
        <div>
            <h2>Success, You are in the game container</h2>
            <p>Your name: {location.state.name}</p>
            <p>Your chosen genre: {location.state.genre}</p>
            <p>your token is {location.state.token}</p>
            
        </div>
    )
}

export default GameContainer