"use client"
import { useState, useEffect } from "react"

import Header from "@/ui-components/app-header";

export default function Home() {
  const [results, setResults] = useState("");

  useEffect(()=> {
    //client component, logs in browser
    //console.log("Entering effect")
    async function nw () {
      //client component, flask isn't running on user's localhost so need to send to server
      const response = await fetch("/api/nw/?stringA=GACC&stringB=GACG", {method : "GET"})
      const data = await response.json();
      //console.log(data, "results")
      setResults(data.stringA)
    }
    nw()
  }, [])

  return (
    <Header>
      <div><p>The results are in: {results}</p></div>
    </Header>
  )
}
