//this function might only be used on local build

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
    //extract parameters from request body
    const reqBody = await request.json();
    const response = await fetch("http://localhost:5000/api/nw/", 
                                {method : "POST", 
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body : JSON.stringify(reqBody)})
    const data = await response.json();
    return new Response(JSON.stringify(data))
}