import PageFrame from "@/ui-components/page-frame";
import Link from "next/link";
import ReadMoreBox from "@/ui-components/read-more-box";

/**
 * Home page of How BLAST Works.
 * 
 * @returns Header component, with children representing main content of this page.
 */
export default function Home() {

  return (
    <PageFrame>
      <h2>A Needle In A Planet Of Hay</h2>
      <p>
        Consider the following nucleotide sequence:
      </p>
      <p className="bg-gray-400 p-1 text-white font-serif rounded-lg text-wrap max-w-min">
        ACCGCAGCGGACAGCGCCAAGTGAAGCCTCGCTTCCCCTCCGCGGCGACCAGGGCCCGAGCCGAGAGTAG
        CAGTTGTAGCTACCCGCCCAGGTAGGGCAGGAGTTGGGAGGGGACAGGGGGACAGGGCACTACCGAGGGG
        AACCTGAAGGACTCCGGGGCAGAACCCAGTCGGTTCACCTGGTCAGCCCCAGGCCTGCGCCCTGAGCGCT
        GTGCCTCGTCTCCGGAGCCACACGCGCTTTAAAAAGGAGGCAAGACAGTCAGCCTCTGGAAATTAGACTT
        CTCCAAATTTTTCTCTAGCCCCTTTGGGCTCCTTTACCTGGCATGTAGGATGTGCCTAGGGAGATAAACG
      </p>
      <p>
        This is, possibly, a segment of a gene (after all, it has thymine, which distinguishes DNA
        from RNA). But is it coding region of that gene, or a non-coding region spliced out 
        during transcription? It might not be a gene at all, but a promoter placed upstream of a gene.
        If it is a gene, then does it code for a protein? Or is it meant to generate a useful piece of RNA,
        like the ribosomal RNA, or interfering RNA that regulates the translation of messenger RNA into 
        protein? 
      </p>
      <p>
        These questions, and more (<em>many</em> more: what organism is this DNA from? Does it have 
        multiple copies of this sequence, or just the one? Do other organisms have similar sequences?
        Do they still perform the same function in those other organisms?) require that we know what
        this sequence actually is. The functions of specific sequences can be discovered experimentally, 
        by observing organisms (or creating mutants) that lack the sequence. This furnishes the
        material for large databases of DNA (as well as RNA and protein) sequences accompanied by 
        annotations or ontologies. These are standardized descriptions of what function a gene performs 
        and what systems it is involved in.  
      </p>
      <p>
        One such resource is NCBI's GenBank, which along with the curated RefSeq database constitutes the
        larger database "nr/nt", or "non-redundant nucleotide". This database now includes 
        <Link href="https://www.nlm.nih.gov/ncbi/workshops/2023-08_BLAST_evol/databases.html">96 million
        sequences, which add up to 1.3 trillion nucleotides</Link>. What kind of tool could search through
        this entire trove, and retrive the name and function of our mystery sequence?
      </p>
      <h2> BLAST: Bringing Sequence Alignment to Big Data </h2>
      <p>
        <strong>BLAST</strong>, 
        short for <strong>B</strong>asic <strong>L</strong>ocal <strong>A</strong>lignment <strong>S</strong>earch <strong>T</strong>ool,
        is a creative reapplication
        of one problem's solution to a very different problem. The original problem, first tackled in the 1970s,
        was pairwise sequence alignment: how to find the greatest overlap between two sequences. The second 
        problem, which certain people in the 1970s likely saw coming, is that of searching through giant databases
        of digitized data for a single sequence, or the sequences closest to it. BLAST uses alignment as a search
        tool, applying it to tens of millions of sequences to find the ones a user is looking for.
      </p>
      <p>
        Pairwise sequence alignment, however, is no mean feat. While the algorithms for it are elegant, they 
        can be quite computationally expensive. BLAST simply could not do this procedure 96 million times. So
        it trades accuracy for speed with heuristics, or methods that approximate the optimal solution to a 
        problem. 
      </p>
      <p>
        To supply the necessary context for an explanation of these heuristics, this site will first introduce
        algorithms for optimal global and local alignment of sequences, and provide interactive spaces to work
        through them. Along the way, there will be discussion of how powerful pairwise alignment is-- while BLAST
        uses it to make data accessible, it was meant to be (and still is) a method for testing new hypotheses
        about the relatedness of species and rates of evolutionary change. Then, there will be interactive
        implementations of the heuristic modifications BLAST introduces into these algorithms.
      </p>
      <p>
        If you're ready, proceed to <Link href="/section1">Section 1.</Link> A link is also available in the 
        collapsible sidebar.
      </p>
      <p>But first, <Link href="https://blast.ncbi.nlm.nih.gov/Blast.cgi">
        try using BLAST yourself!</Link></p>
      <ul className="list-disc">
        <li>Open up "Nucleotide BLAST".</li>
        <li>In the "Enter Query Sequence" box, paste the mystery sequence above.</li>
        <li>In the "Choose Search Set" box, make sure "Nucleotide collection (nr/nt) is selected.</li>
        <li>Hit BLAST, and wait to be redirected to the search results</li>
        <li>Optional: Press "Edit Search" to return to the previous page, and try changing some
          things. Filter the database by a specific organism (you may know which one to choose by
          now). Pick a different database (warning: some of these may be even larger than nr/nt,
          the query may take several minutes to run.)
        </li>
      </ul>
      <ReadMoreBox>
        <li><Link href="https://www.ncbi.nlm.nih.gov/books/NBK50679/#RefSeqFAQ.what_is_the_difference_between_1">
          NCBI's GenBank archive and curated RefSeq database.</Link></li>
        <li><Link href="https://www.nlm.nih.gov/ncbi/workshops/2023-08_BLAST_evol/blast_basics.html">
          The NIH's BLAST workshop, August 2023.</Link></li>
        <li><Link href="https://ncbiinsights.ncbi.nlm.nih.gov/?s=BLAST">
          Recent news in the NCBI Insights blog.</Link></li>
      </ReadMoreBox>
    </PageFrame>
  )
}
