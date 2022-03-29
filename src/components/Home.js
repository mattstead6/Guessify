
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Home({handleSubmit, setPlayerData, playerData, resetPlayerdata}) {
    useEffect(() => (
        resetPlayerdata()
    ),[])

import { useDocumentTitle } from "./utilites";


import "../style.css"
import logo from "../GUESSIFY.png"

    
    const navigate = useNavigate();

    return (
        <> 
       
            <section>
            <img className= "image" src={logo} alt="logo" />
                <div className="loader">
                    <div className="dot" style={{['--i']: "0"}}></div>
                    <div className="dot" style={{['--i']: "1"}}></div>
                    <div className="dot" style={{['--i']: "2"}}></div>
                    <div className="dot" style={{['--i']: "3"}}></div>
                    <div className="dot" style={{['--i']: "4"}}></div>
                    <div className="dot" style={{['--i']: "5"}}></div>
                    <div className="dot" style={{['--i']: "6"}}></div>
                    <div className="dot" style={{['--i']: "7"}}></div>
                    <div className="dot" style={{['--i']: "8"}}></div>
        
                </div>
                
                
                <button onClick={handleSubmit}className="startbutton"type="submit" style={{backgroundColor: "black"}}>
                <h2>     
                    PLAY NOW</h2>
                    </button>
                    <form onSubmit={handleSubmit}>
                    <input onChange={e => setPlayerData(prev => ({...prev, username: e.target.value }))} type="text" id="name" name="name" placeholder='Your name here...' value={playerData.username}></input>
                    </form>
                    <div className="loader">
                    <div className="dot" style={{['--i']: "0"}}></div>
                    <div className="dot" style={{['--i']: "1"}}></div>
                    <div className="dot" style={{['--i']: "2"}}></div>
                    <div className="dot" style={{['--i']: "3"}}></div>
                    <div className="dot" style={{['--i']: "4"}}></div>
                    <div className="dot" style={{['--i']: "5"}}></div>
                    <div className="dot" style={{['--i']: "6"}}></div>
                    <div className="dot" style={{['--i']: "7"}}></div>
                    <div className="dot" style={{['--i']: "8"}}></div>
        
                </div>   
               

      

            <button onClick={() => navigate("./Leaderboard")}
            >Leaderboard</button>

            
            </section>
            

        </>
    )
}

export default Home