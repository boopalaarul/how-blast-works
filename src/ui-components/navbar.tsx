//"use server" //could work, but app header needs to be able to tell difference between children

import Link from "next/link"

export default function NavBar() {

    //want to eventually make this not hardcoded, leave it like this for now
    const links = [
        "Introduction / Global Sequence Alignment with Needleman-Wunsch",
        "Local Sequence Alignment with Smith-Waterman",
        "Introduction to BLAST's Heuristics",
        "Demonstration of BLAST's Heuristics",
        "Full BLAST",
    ]

    return (
        <nav className="min-w-[20%] max-w-[20%] flex flex-col space-y-5 bg-green-400">
            {
                links.map((value, index) => {
                    return (
                    <Link key={`link to page ${index+1}`} href={`/section${index+1}`}>
                        <p>Section {index+1}: {value}</p>
                    </Link>
                    )
                })
            }
        </nav>
    )
}