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

export const AUTH_KEYS ={ CLIENT_ID: "ad207e953e224110b18641630a57a298", 
REDIRECT_URI: "http://localhost:3000/",
AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
RESPONSE_TYPE: "token"
}  


export const STAT_URL = "http://localhost:3001/scores"