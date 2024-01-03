export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    //convert string to URL object, extract parameters
    const { searchParams } = new URL(request.url)
    const string_a = searchParams.get('stringA')
    const string_b = searchParams.get('stringB')
    console.log(string_a, string_b)
    const response = await fetch(`http://localhost:5000/nw/${string_a}/${string_b}`)
    return new Response(JSON.stringify({stringA : string_a, stringB : string_b}))
}