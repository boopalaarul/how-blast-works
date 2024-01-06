export default function QuoteBox( {quote, attribution} : {quote: string, attribution: string}) {
    return (
        <p className="flex flex-col justify-left bg-gray-500 p-5 text-white font-serif rounded-lg text-wrap">
            {quote} ({attribution})
        </p>
    )
}