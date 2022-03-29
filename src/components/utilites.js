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


export const STAT_URL = "http://localhost:3001/scores"