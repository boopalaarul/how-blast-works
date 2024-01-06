import { Alignment } from "@/lib/definitions";
import { useState } from "react";

/**
 * Component that offers an input box to write potential pairwise alignments in a specific format, 
 * and then checks the input against the correct set of optimal pairwise alignments for this problem.
 * @param "{alignments}", prop object containing an Alignment[] deserialized from a preset file or
 * from a real-time API response.
 * @returns "<PairwiseAlignments>" component with the behavior described above.
 */
export default function PairwiseAlignments ({alignments} : {alignments : Alignment[]}) {

    //saving the optimal alignments as a set containing each of the alignments and
    //their reverses (elements in reverse order)
    //doesn't need to be a state variable since it never changes
    //arrays have to be converted to strings because sets can only store primitive datatypes
    //or references to data structures, and can't do equality checks on references
    const optimalAlignmentSet = new Set<string>();
    alignments.map((al) => {
        optimalAlignmentSet.add([al[0], al[1]].toString());
        optimalAlignmentSet.add([al[1], al[0]].toString());
    })

    //state variable & event handler to control input of form
    const [inputText, setText] = useState("AAA\nAAT\n\nGGG\nGGC");
    function handleInputChange (event : any) {
        const target = event.target as HTMLTextAreaElement;
        setText(target.value);
    }

    //state variable to control answer-checker output
    const [checkResults, setCheckResults] = useState("");

    //Checks answers against OptimalAlignmentSet
    function checkAlignments () {

        //storing inputs in a set also eliminates duplicates from input
        //storing reverse of each input as well to make sure either form of user input
        //passes the check
        const unformatted_input = inputText.split("\n\n")
        const inputSet = new Set<string>()
        unformatted_input.map((al_string)=>{
            const newAlignment = al_string.split("\n")
            inputSet.add([newAlignment[0], newAlignment[1]].toString());
            inputSet.add([newAlignment[1], newAlignment[0]].toString());
        })  
        
        //each of the optimal alignments might be present (in forward or reverse) or absent
        //from input, and each input might be one of the optimal inputs or a completely wrong answer
        const numOptimalAlignments = alignments.length
        const numInputAlignments = inputSet.size / 2
        let count = 0;

        console.log(inputSet)
        inputSet.forEach((input)=>{
            if(optimalAlignmentSet.has(input)) {
                //expect count to go up by 2 for each correct answer within input, since inputs
                //are doubled to include forward and reverse
                count++;
            }
        })
        //scaling back down from "doubling" effect
        const numOptimalInInput = count / 2
        setCheckResults(`${numOptimalInInput} of ${numOptimalAlignments} optimal alignments found, `
                    + `${numInputAlignments - numOptimalInInput} inputs incorrect`)
    }

    return (
        <div className="bg-gray-300 flex flex-col space-y-2 p-5 rounded-lg">
            <p>Enter optimal alignments (e.g. (XXX, YYY), (WWW, ZZZ)) in the format 
                "XXX\nYYY\n\nWWW\nZZZ" where "\n" is a line break. 
            </p>
            <p className="text-sm">If you need to, drag the bottom right corner of the text area
                to adjust its height.</p>
            <textarea onChange={handleInputChange} value={inputText}/>
            <div>
                <button 
                onClick={checkAlignments}
                disabled={inputText.length <= 1}
                className="bg-green-700">Check Alignments</button>
                <p>{checkResults}</p>
            </div>
        </div>
    )

}