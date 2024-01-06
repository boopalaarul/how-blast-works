import PageFrame from "@/ui-components/page-frame";
import QuoteBox from "@/ui-components/quote-box";
import AlignmentSandbox from "@/ui-components/alignment-sandbox";
import AlignmentFromPreset from "@/ui-components/alignment-preset";
export default function Home() {

  return (
    <PageFrame>
      <div className="rounded-lg border-[2px] border-black mb-10 p-5">
        <p>In this section:</p>
        <ul className="list-disc">
          <li>The Needleman-Wunsch algorithm for global alignment will be discussed and worked through.</li>
          <li>An interactive element will allow the user to create new problems of their own design, for
          which the correct answers will be generated in real time.</li>
        </ul>
      </div>
      <h2>Microcomputer Biology</h2>
      <QuoteBox quote="The smallest unit of comparison is a pair of amino acids, one from each protein. The
maximum match can be defined as the largest number of amino acids of one protein that
can be matched with those of another protein while allowing for all possible deletions.
The maximum match can be determined by representing in a two-dimensional array?
all possible pair combinations that can be constructed from the amino acid sequences
of the proteins, A and B, being compared. " attribution="Needleman and Wunsch, 1970"/>

      <p>
        In 1969, Saul B. Needleman and Christian D. Wunsch of Northwestern University put forward a
        "computer adaptable" method for global pairwise sequence alignment, or finding the greatest overlap
        between two entire sequences. (The related task of finding the greatest overlap between one
        smaller sequence and part or all of another is called local alignment, and will be discussed in 
        Section 2.) 
      </p>
      <p>In the following simple case of global alignment, there are two strings and three
        parameters. The smallest unit of comparison is a pair of letters, one from each of the strings.
        Each of these pairs needs to be scored using one of the three parameters:
        the match bonus, the mismatch penalty, and the gap penalty. However, the scores of later pairs
        will depend on the scores of earlier pairs. The final score will be influenced by all the letters
        before it.
      </p>
      <AlignmentFromPreset filename="section1-twoletter" />
      <ul className="list-disc">
        <li>Start at the top left cell of the matrix, and give it a score of 0.</li>
        <li>For the first row, note the '_' character in the row label. This character represents
          an <strong>absence</strong> of a contribution from the string "GA". The column label is 
          G, so this cell represents the pair ('_', 'G'). This represents the insertion of a gap
          into an ongoing alignment: starting from the pair of empty strings ("", ""), we have now
          reached ("_", "G"). If the score of ("", "") is 0 (and according to the top left cell, it
          is), then the score of ("_", "G") must be 0 + (gap penalty), or 0 + (-2).</li>
        <li>
          Since the score of the "previous string" is found in the cell to the left of the current
          cell, click the "left" arrow on this cell.
        </li>
        <li>
          The next cell of the first row is ('_', 'C'). Adding this cell onto the "previous string",
          we see that we've added one more gap onto ("_", "G"). Alternately, this has added two gaps
          onto ("", ""). What should the score be, and which arrow should be activated?
        </li>
        <li>Fill out the first column, with the same logic as the first row.</li>
        <li>
          Now comes the interesting part. Begin at the cell representing the pair ('G', 'G'). There 
          is a cell above it, a cell to its left, and a cell diagonal to it on the top-left. All of these 
          represent pairs of earlier letters. Which one should this cell "connect" to, and in which direction
          should its arrow point?
        </li>
      </ul>
      <p>Since we are looking for an optimal solution, we want this cell to have the best possible score.
          There are four options. If one of the options leads to a score better than all the others, then
          click the arrow representing that option. If two options deliver equal scores, then it is 
          recommended to click more than one of the arrows.</p>
      <ul className="list-decimal">
        <li>If this cell represents a pair of matching letters, we can apply the match
          bonus. Since we can't use the same letter twice, this cell's "previous string" should not include either
          of the letters in the pair. This leaves only the "diagonal cell", so this cell's score is that cell's plus
          the match bonus. 
        </li>
        <li>If this cell represents a pair of mismatching letters, we apply the mismatch penalty. Again, we
          can't use the same letter twice.
        </li>
        <li>Instead of declaring a mismatch, we could also insert a gap. This would use one of the letters, 
          but not the other. If inserting a gap into string A, the "previous string" should include string
          A's character for this cell, but not string B's character. This condition is filled by the cell
          directly to the left of the current cell. (In the first row, where we were inserting gaps and not
          using any of string A's characters, we derived scores from the cells to the left.)
        </li>
        <li>Inserting a gap into string B would work the same way, except that the score would be derived
          from the cell above the current cell. In this example, the gap penalty is greater than the mismatch
          penalty, so the alignment will favor mismatches over gaps. In other cases, the gap penalty may be
          equal to or greater than the mismatch penalty.
        </li>
      </ul>

      <p>When you are finished, press "Check Answers". Correct choices will be highlighted in green,
        and wrong choices in red.
      </p>

      <h2>Backtracking To Spell Out Optimal Alignments</h2>
      {/* ok this part's easy just need to finish the PairwiseAlignments and include it in
      AlignmentFromPreset, then provide instructions
      just use goran's problem for this*/}


      <h2>The Sandbox</h2>
      <p>As the quote at the start of this page says, Needleman and Wunsch intended their algorithm
        to be used for comparing proteins, not DNA strings. Proteins can be represented as strings
        too, where each character represents one of 20 amino acids. However, the algorithm can be used
        on any string of symbols. Don't believe me? Design your own global alignment problem below.
        The "Generate Blank Matrix" button will update the score matrix within the sandbox, as well
        as the alignment input area.</p> 
      <p>Every problem has its own solution, but the "Check Answers" and "Check Alignments" buttons
        will validate the input, using correct answers supplied by an automated implementation of 
        the same algorithm you've been slogging through by hand. As was evident in 1969, computers
        sure are useful.
      </p>
      <AlignmentSandbox />
    </PageFrame>
  )
}
