import { useEffect } from "react";

export function fetchConfigObj(method, body) {
  return { method,
           headers : { 'Content-Type': 'application/json',
                        Accept : 'application/json' },
           body : JSON.stringify(body)
         }
}

export function useDocumentTitle(title) {
  useEffect(()=> {
    document.title = title
  },[title])
}

export const AUTH_KEYS ={ CLIENT_ID: "3ff2acf3ef7d4bd8833a55d0416b3228", 
REDIRECT_URI: "https://guessify-ny.herokuapp.com",
AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
RESPONSE_TYPE: "token"
}  


// export const STAT_URL = "http://localhost:3001/scores"
export const STAT_URL = "/scores"