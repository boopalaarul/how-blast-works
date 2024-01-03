//should be a child of the HamburgerButton so i can change the state variable w
//a single state variable with the onclick
//obviously this is a .tsx file since we need to use JSX here

import { useState } from "react"

export default function NavBar() {

    //want to eventually make this not hardcoded, leave it like this for now
    const [links, setLinks] = useState([
        "Introduction / Global Sequence Alignment with Needleman-Wunsch",
        "Local Sequence Alignment with Smith-Waterman",
        "Introduction to BLAST's Heuristics",
        "Demonstration of BLAST's Heuristics",
        "Full BLAST",
    ])

    return (
        <div className="w-1/5 flex flex-col space-y-5 bg-green-400">
            {
                links.map((value, index) => {
                    return <p key={index+1}>Section {index+1}: {value}</p>
                })
            }
        </div>
    )
}