import { useState, useEffect } from "react"

export default function Home() {
  const [results, setResults] = useState("");

  useEffect(()=> {
    async function nw () {
      const response = await fetch("/nw/GACC/GACG", {method : "GET"})
      const data = await response.json();
      setResults(data.string_a)
    }

  }, [])
  return (<p>{results}</p>)
}
