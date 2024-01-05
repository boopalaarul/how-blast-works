"use client"
import { useState, useEffect } from "react"
import { Score, Direction, Alignment, GlobalAlignmentForm } from "@/lib/definitions";
import ScoreMatrixGrid from "./score-matrix-grid";

export default function AlignmentFromPreset ({filename} : {filename: string}) {

    //on initial center, all of these state variables will be undefined-- need to have 
    //ScoreMatrixGrid wait until then!
    const [scoreMatrix, setScoreMatrix] = useState([[]] as Score[][]);
    const [directionMatrix, setDirectionMatrix] = useState([] as Direction[][][]);
    const [alignments, setAlignments] = useState([] as Alignment[]); 
    const [form, setForm] = useState({stringA: "", stringB : ""} as GlobalAlignmentForm)
    
    useEffect(()=>{
        async function getJson() {
            const response = await fetch(`${window.location.origin}/json/${filename}.json`)
            //deserialize body
            const preset_body = await response.json();
            //deserialize fields: each array was serialized w/ json.dumps() in Python
            setScoreMatrix(Array.from(JSON.parse(preset_body.score_matrix)));
            setDirectionMatrix(Array.from(JSON.parse(preset_body.direction_matrix)));
            setAlignments(Array.from(JSON.parse(preset_body.alignments)));
            //this field is an object with named properties
            setForm(JSON.parse(preset_body.input_form))
        }
        getJson();
    }, [])
    return (
        <ScoreMatrixGrid 
            inputForm={form} 
            scoreMatrix={scoreMatrix} 
            directionMatrix={directionMatrix} />
    )
}