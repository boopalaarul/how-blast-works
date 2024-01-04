import { useState, useEffect } from "react";

type formType = {
    stringA : string,
    stringB : string,
    match : number,
    mis : number,
    gap : number
}

//Sends form, fills out data through its props (which are its parent's state variables)
export default function AlignmentForm({ setScoreMatrix, setDirMatrix, setAlignments } : any) {

    /*
    useEffect(() => {
        console.log(formState)
    })
    */

    const [formState, setForm] = useState({
        stringA : "GACC",
        stringB : "GACG",
        match : 1,
        mis : -1,
        gap : -2
    } as formType);
    
    function handleInputChange(e : any) {
        const target = e.target as HTMLInputElement;
        const id = target.id;
        const value = target.value;
        switch (id) {
            case "stringA":
            case "stringB": {
                setForm({
                    ...formState,
                    [id] : value
                })
                break;
            }
            //event.target.value is a string even for type="number" inputs,
            //converting it back to a number just for consistency-- will
            //be stringified anyways when sending request to API
            default: {
                setForm({
                    ...formState,
                    [id] : Number(value)
                })
            }
        }
    }

    async function handleSubmit() {
        //client component, flask isn't running on user's localhost so need to send to server
        console.log("entering handlesubmit")
        const response = await fetch("/api/nw/", {method : "POST", body : JSON.stringify(formState)})
        const data = await response.json();
        setScoreMatrix(data.score_matrix);
        setDirMatrix(data.direction_matrix);
        setAlignments(data.alignments);
        //console.log(data, "results");
    }
    
    return(<>
        <div className="flex flex-row space-x-5">
            <div>
                <label htmlFor="stringA">String A:</label>
                <input type="text" className="w-auto" id="stringA" value={formState.stringA} onChange={handleInputChange} />
            </div>
            
            <div>
                <label htmlFor="stringB">String B:</label>
                <input type="text" className="w-auto" id="stringB" value={formState.stringB} onChange={handleInputChange} />
            </div>
        </div>

        <div className="flex flex-row space-x-5">

            <div>
                <label htmlFor="match">Match bonus:</label>
                <input type="number" className="w-auto" min={1} max={5} id="match" value={formState.match} onChange={handleInputChange} />
            </div>
            
            <div>
                <label htmlFor="mis">Mismatch penalty:</label>
                <input type="number" className="shrink" min={-5} max={0} id="mis" value={formState.mis} onChange={handleInputChange} />
            </div>
            
            <div>
                <label htmlFor="gap">Gap penalty:</label>
                <input type="number" min={-5} max={0} id="gap" value={formState.gap} onChange={handleInputChange} />
            </div>           
        </div>

        <button className="bg-green-700" onClick={handleSubmit}>Submit</button>
    </>)
}