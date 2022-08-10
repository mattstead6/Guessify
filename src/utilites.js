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

export const AUTH_KEYS ={ CLIENT_ID: "1b216146515042f496e489247206abec", 
REDIRECT_URI: "https://guessify-ny.herokuapp.com",
AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
RESPONSE_TYPE: "token"
}  


// export const STAT_URL = "http://localhost:3001/scores"
export const STAT_URL = "/scores"