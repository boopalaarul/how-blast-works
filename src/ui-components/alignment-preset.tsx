"use client"
import { useState, useEffect } from "react"
import { Score, Direction, Alignment, GlobalAlignmentForm } from "@/lib/definitions";
import ScoreMatrixGrid from "./score-matrix-grid";
import PairwiseAlignments from "./pairwise-alignments";

/**
 * Component that generates a global or local alignment problem without querying the Flask API.
 * Instead, it fetches a saved API response in the form of a JSON "preset" file, which contains
 * the input form that was used to request from the API, along with the outputs of the API: score
 * matrix, direction matrix, and pairwise alignments.
 * 
 * @param "{ filename, showAlignmentInput }" : "filename" is the name of a JSON preset file from
 * /public/json, minus the ".json" suffix. "showAlignmentInput" is true when this component should
 * render an input for backtraced pairwise alignments (the PairwiseAlignments component), false
 * otherwise.
 * 
 * @returns AlignmentFromPreset, component with the behavior described above.
 */
export default function AlignmentFromPreset ({
    filename, showAlignmentInput
} : {
    filename: string, showAlignmentInput : boolean
}) {

    //on initial center, all of these state variables will be undefined-- ScoreMatrixGrid
    //will generate an "empty" score matrix with just the "_" character
    const [scoreMatrix, setScoreMatrix] = useState([[]] as Score[][]);
    const [directionMatrix, setDirectionMatrix] = useState([] as Direction[][][]);
    const [alignments, setAlignments] = useState([] as Alignment[]); 

    //need to refactor all this to address the strings as "query" and "subject"
    const [form, setForm] = useState({stringA: "", stringB : ""} as GlobalAlignmentForm)
    
    //post-render effect, fills in state variables exactly once
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
    return (<>
        <ScoreMatrixGrid 
            inputForm={form} 
            scoreMatrix={scoreMatrix} 
            directionMatrix={directionMatrix} />
        {
            showAlignmentInput
            ? <PairwiseAlignments alignments={alignments}/>
            : null
        }
    </>)
}