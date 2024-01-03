import numpy as np
import math

DIAG_EDGE = "*"
DOWN_EDGE = "v"
RIGHT_EDGE = ">"

def generate_needleman_wunsch(strings, match_weight, mis_weight, gap_weight):
    """Generates a score matrix for the Needleman-Wunsch algorithm for global alignment
    of two nucleotide strings. Also returns a direction matrix for backtracing within the
    matrix and recovering the global alignments that give the optimal score.

    Parameters
    ----------
    strings : list
        List of two strings for global alignment.
    match_weight : int
        Score bonus for a match between two positions in the strings. Must be >= 0.
    mis_weight: int
        Score penalty for a mismatch between two positions in the strings. Must be <= 0.
    gap_weight: int
        Score penalty for the insertion of a gap into one of the strings. Must be <= 0.

    Returns
    -------
    (numpy.ndarray, numpy.ndarray)
        Score and direction matrices for global alignment of these two strings. Optimal
        alignments start in the bottom right corner.
    """
    a, b = strings
    score_array = np.zeros((len(a) + 1, len(b) + 1),dtype=np.short)
    direction_array = np.zeros((len(a) + 1, len(b) + 1, 3),dtype=str)

    #initialize the first row and first column
    score_array[0][0] = 0
    for i in range(1, len(a) + 1):
        score_array[i][0] = score_array[i-1][0] + gap_weight
        direction_array[i][0][2] = DOWN_EDGE
    for j in range(1, len(b) + 1):
        score_array[0][j] = score_array[0][j-1] + gap_weight
        direction_array[0][j][1] = RIGHT_EDGE

    #fill out the rest of the tables
    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            mis_or_match = score_array[i-1][j-1] + \
                (match_weight if a[i-1] == b[j-1] else mis_weight)
            gap_in_a = score_array[i][j-1] + gap_weight
            gap_in_b = score_array[i-1][j] + gap_weight
            #find the maximum & assign pointers
            score_array[i][j] = max(mis_or_match, gap_in_a, gap_in_b)
            if score_array[i][j] == mis_or_match:
                direction_array[(i, j)][0] = DIAG_EDGE
            if score_array[i][j] == gap_in_a:
                direction_array[(i, j)][1] = RIGHT_EDGE
            if score_array[i][j] == gap_in_b:
                direction_array[(i, j)][2] = DOWN_EDGE

    #Returns score_array full of optimal scores for each cell, 
    #direction_array full of algorithm results for pathing
    return score_array, direction_array

#for the purpose of longest commmon discontinuous subsequence i only need 1 alignment
#generating all of them for 1000 bp string x 1000 bp string would take a long time

#this isn't right, i should already have the recursive alg for backtracing multiple alignments
#or wait... i think i made that for smith-waterman and then it got eaten lmao
def find_all_matches(strings, match_weight, mis_weight, gap_weight):
    strings.sort(key=len)
    a, b = strings
    score, point = generate_needleman_wunsch(strings, match_weight, mis_weight, gap_weight)

    array_shape = np.shape(score)
    #coordinates of last cell in score array
    max_i = array_shape[0] - 1
    max_j = array_shape[1] - 1
    match_string = ""
    non_match_string = ""

    while max_i > 0 or max_j > 0:
        #match or mismatch
        if point[max_i, max_j][0] == DIAG_EDGE:
            #only record the matches in match_string
            if a[max_i-1] == b[max_j-1]:
                match_string = a[max_i-1] + match_string
            else:
                non_match_string = b[max_j-1] + non_match_string
            #continue to next loop, last cell of new array = S[i-1, j-1]
            max_i = max_i - 1
            max_j = max_j - 1
            continue

        #gap in a
        elif point[max_i, max_j][1] == RIGHT_EDGE:
            non_match_string = b[max_j-1] + non_match_string
            #continue to next loop, new last cell = S[i, j-1]
            max_j = max_j - 1
            continue

        #gap in b
        elif point[max_i, max_j][2] == DOWN_EDGE:
            #continue to next loop, new last cell = S[i-1, j]
            max_i = max_i - 1
            continue
        #above 3 cases should handle everything, this assert should never be triggered
        print(max_i, max_j)
        assert(False)
    return match_string, non_match_string