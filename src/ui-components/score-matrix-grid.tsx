import { useState } from "react";
import AlignmentCell from "./alignment-cell";
import { Score } from "@/lib/definitions";

export default function ScoreMatrixGrid( {inputForm, scoreMatrix, directionMatrix} : any) {

    const [checkMode, setCheckMode] = useState(false);

    //generate column labels for cells
    const col_string_array = Array.from("_" + inputForm.stringB)
    const col_labels = col_string_array.map((letter, index) => {
        //spacing: 70 + 20
        return <p key={`col ${index} label`} className="text-center w-[90px]">{letter}</p>
    })

    //generate row labels for cells
    const row_string_array = Array.from("_" + inputForm.stringA)
    const row_labels = row_string_array.map((letter, index) => {
        return <p key={`row ${index} label`} className="text-center">{letter}</p>
    })

    //generate cells of matrix
    const cells = scoreMatrix.map((row : Score[], i: number) => {
        //outermost JSX element returned from map needs to have a key
        return <div key={`row ${i} contents`} 
            className="flex flex-row space-x-[20px] border-t-[2px] border-black max-w-fit">

            {row_labels[i]}
            
            {row.map((cell : Score, j: number) => {
            //outermost JSX element returned from map needs to have a key
            return <AlignmentCell key={`(${i}, ${j}) cell`} 
                    correctScore={cell} 
                    correctDirs={directionMatrix[i][j]}
                    checkMode={checkMode} />;
        })}</div>
    })

    return (
        <div className="p-5 rounded-lg bg-gray-300 max-w-fit">
            <div>
                <p>String A: {inputForm.stringA}</p>
                <p>String B: {inputForm.stringB}</p>
                <p>Match bonus: +{inputForm.match}</p>
                <p>Mismatch penalty: {inputForm.mis}</p>
                <p>Gap insert penalty: {inputForm.gap}</p>
            </div>

            {/* rendering grid */}
            <div>
                <div className={"flex flex-col border-b-[2px] border-black"}>
                    {/* row of all the column labels */}
                    <div className="flex flex-row max-w-fit">
                        {col_labels}
                    </div>
                    {cells}
                </div>

                <button className="bg-green-700" onClick={()=>{setCheckMode(!checkMode)}}>
                    Check Answers
                </button>
            </div>
        </div>
    )
}