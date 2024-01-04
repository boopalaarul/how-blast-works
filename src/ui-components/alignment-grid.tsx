import { useState, useEffect } from "react";
import AlignmentForm from "./alignment-form";

export default function AlignmentGrid() {
    const [scoreMatrix, setScoreMatrix] = useState([]);
    const [directionMatrix, setDirectionMatrix] = useState([]);
    const [alignments, setAlignments] = useState([]); 

    useEffect(() => {
        console.log(scoreMatrix);
        console.log(directionMatrix);
        console.log(alignments);
    })
    return (
        <AlignmentForm 
            setScoreMatrix={setScoreMatrix} 
            setDirMatrix={setDirectionMatrix} 
            setAlignments={setAlignments} />
    )
}