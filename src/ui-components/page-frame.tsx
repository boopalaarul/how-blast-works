"use client"
//want to treat this as an extensible template for a number of different pages: means 
//we have to have a children prop
import { useState } from "react";
import NavBar from "./navbar";
import Link from "next/link";

/**
 * Frame that holds necessary elements of each page, such as the header and navigation sidebar,
 * and applies uniform styling onto pages' unique components.
 * 
 * @param { children } : props object containing children composed into this component by each
 * page in the respective "page.tsx".
 * @returns 
 */
export default function PageFrame( {children} : {children: React.ReactNode} ) {

    const [navbarVisible, setNavbarVisible] = useState(true);

    return (
        <>
            <div className="flex flex-row bg-green-700 px-5 py-2">
                <button className="text-3xl" onClick={()=>{setNavbarVisible(!navbarVisible)}}>[≡]</button>
                <h1 className="grow text-3xl text-center">
                    <Link href="/">How BLAST Works</Link>
                </h1>
                <p className="py-1"><Link href="https://github.com/boopalaarul/how-blast-works">
                    See my code!</Link></p>
            </div>
            <div className="flex flex-row h-full">
                {navbarVisible ? <NavBar/> : null}
                <div className="page-content">
                    {children}
                </div>
            </div>
        </>
    )

}