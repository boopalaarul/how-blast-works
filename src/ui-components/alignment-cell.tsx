"use client"

//each cell should have the following qualities:
//1: be square and a reasonable size, don't distort too much
//2: contain a space for input (number) and for three buttons
    //the buttons should stay depressed after being clicked (easy enough w a state variable)
//3: have a post-render effect that can make them light up as "correct" or "incorrect" by changing
//bg (1 effect should regulate all four cell elements)

import { useState, useEffect } from "react"

enum ScoreColors {
    Default = "",
    Correct = "bg-score-correct",
    Wrong = "bg-score-wrong"
}

enum DirColors {
    Default = "",
    Correct = "bg-dir-correct",
    Wrong = "bg-dir-wrong"
}

export default function AlignmentCell ({correctScore, correctDirs, checkMode} : any) {

    const [score, setScore] = useState("");
    const [scoreColor, setScoreColor] = useState(ScoreColors.Default);

    //these all share the same event handler, bundled for easy update by single method
    //"as {index type}": allows indexing (accessing properties) of this object with string as key
    const [dirs, setDirs] = useState({
        diagonal : false,
        up : false,
        left : false,
    } as { [dir : string] : boolean} )

    //could make this object include score color too, output type would be DirColors | ScoreColors
    const [dirColors, setDirColors] = useState({
        diagonal: DirColors.Default,
        left: DirColors.Default,
        up: DirColors.Default
    } as { [dir : string] : DirColors} )

    useEffect(() => {
        console
        if(checkMode) {
            //set all colors to "check answers": green tones if correct, red otherwise
            setScoreColor(Number(score) === correctScore ? ScoreColors.Correct : ScoreColors.Wrong);
            setDirColors({
                diagonal: dirs.diagonal 
                            ? (correctDirs[0] !== "" ? DirColors.Correct : DirColors.Wrong) 
                            : DirColors.Default,
                left: dirs.left
                        ? (correctDirs[1] !== "" ? DirColors.Correct : DirColors.Wrong) 
                        : DirColors.Default,
                up: dirs.up 
                    ? (correctDirs[2] !== "" ? DirColors.Correct : DirColors.Wrong) 
                    : DirColors.Default,
            })
        } else {
            //set all colors to defaults
            setScoreColor(ScoreColors.Default);
            setDirColors({
                diagonal: DirColors.Default,
                left: DirColors.Default,
                up: DirColors.Default
            })
        }

    }, [checkMode])

    function handleScoreChange(event : any) {
        const target = event.target as HTMLInputElement;
        setScore(target.value);
    }

    function handleDirClick(event : any) {
        const target = event.target as HTMLButtonElement;

        setDirs({
            ...dirs,
            [target.id] : !dirs[target.id]
        })
    }

    return (
        <div className="w-[70px] h-[70px] flex flex-row">
            <div className="w-1/2 flex flex-col">
                {/* divs can't fire click events, buttons can */}
                <button id="diagonal" 
                    className={`h-1/2 ${dirs.diagonal ? "button-selected" : null} ${dirColors.diagonal}`} 
                    onClick={handleDirClick}>
                    {"*"}
                </button>
                <button id="left" 
                    className={`h-1/2 ${dirs.left ? "button-selected" : null} ${dirColors.left}`} 
                    onClick={handleDirClick}>
                    {"<"}
                </button>
            </div>
            <div className="w-1/2 flex flex-col">
                <button id="up" 
                    className={`h-1/2 ${dirs.up ? "button-selected" : null} ${dirColors.up}`} 
                    onClick={handleDirClick}>
                    {"^"}
                </button>
                <div className={`h-1/2`}>
                    <input 
                        type="number" 
                        className={`w-full h-full ${scoreColor}`} 
                        value={score}
                        onChange={handleScoreChange}/>
                </div>
            </div>
        </div>
    )

}