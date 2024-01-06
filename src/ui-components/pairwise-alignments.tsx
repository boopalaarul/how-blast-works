import { Alignment } from "@/lib/definitions";
import { useState } from "react";

export default function PairwiseAlignments ({alignments} : {alignments : Alignment[]}) {

    const AlignmentSet = new Set<string>();
    alignments.map((al) => {
        AlignmentSet.add([al[0], al[1]].toString());
        AlignmentSet.add([al[1], al[0]].toString());
    })

    function printAlignments () {

        //storing inputs in a set also eliminates duplicates from input
        const unformatted = inputText.split("\n\n")
        const inputSet = new Set<string>()
        unformatted.map((al)=>{
            const newAlignment = al.split("\n")
            inputSet.add([newAlignment[0], newAlignment[1]].toString());
            inputSet.add([newAlignment[1], newAlignment[0]].toString());
        })  
        console.log(AlignmentSet)
        console.log(inputSet)
        
        const numCorrectAlignments = alignments.length
        const numInputAlignments = inputSet.size / 2
        let count = 0;
        inputSet.forEach((input)=>{
            console.log(input)
            if(AlignmentSet.has(input)) {
                count++;
                //console.log(input)
            }
        })
        count = count / 2
        console.log(`${count} of ${numCorrectAlignments} found,`
                    + ` ${numInputAlignments - count} inputs incorrect`)
    }

    const [inputText, setText] = useState("AAA\nAAT\n\nGGG\nGGC");

    function handleInputChange (event : any) {
        const target = event.target as HTMLTextAreaElement;
        setText(target.value);
    }
    return (
        <>
        <textarea onChange={handleInputChange} value={inputText}/>
        <button 
            onClick={printAlignments}
            className="bg-green-700">list alignments</button>
        </>
    )

}