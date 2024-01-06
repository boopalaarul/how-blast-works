/**
 * Uniform format for "see also" sections, where helpful links and further reading are listed.
 * @param "{children}" : props object with <li> bullet point listed items.
 */
export default function ReadMoreBox( {children} : {children: React.ReactNode}){
    
    //enclosing in an empty node, or else h2 and p will fall out of the formatting rules in
    //globals.css
    return (<>
        <h2>Read more about...</h2>
        <ul className="list-disc">
            {children}
        </ul>
    </>)

}