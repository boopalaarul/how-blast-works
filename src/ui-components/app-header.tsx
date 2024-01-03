//want to treat this as an extensible template for a number of different pages: means 
//we have to have a children prop
import { useState } from "react";
import NavBar from "./navbar";

export default function Header( {children} : {children: any} ) {

    const [navbarVisible, setNavbarVisible] = useState(true);

    return (
        <>
            <div className="flex flex-row bg-green-700">
                <button className="text-3xl" onClick={()=>{setNavbarVisible(!navbarVisible)}}>[≡]</button>
                <h1 className="grow text-3xl text-center">How BLAST Works</h1>
                <p>[Github icon]</p>
            </div>
            <div className="flex flex-row h-dvh">
                {navbarVisible ? <NavBar/> : null}
                <div className="grow">
                    {children}
                </div>
            </div>
        </>
    )

}