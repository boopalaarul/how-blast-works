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
        List of two strings for global alignment. The first string will be represented by
        the rows of the resulting matrices, and the second string will be represented by
        the columns.
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
def find_all_matches(strings, score_matrix, direction_matrix):
    
    #coordinates of last cell in score array
    max_i = np.shape(score_matrix)[0] - 1
    max_j = np.shape(score_matrix)[1] - 1
    
    #axes of the score, direction matrices are 1 unit longer than original strings,
    #because score/direction matrices have the "gap insert" character prepending string
    #can adjust strings to compensate for this
    a = "_" + strings[0]
    b = "_" + strings[1]

    #have a recusive traverser method going here, spawns one or two child calls
    #base case should return the entire alignment (base case is of course reaching)
    #i = 0 or j = 0
    #as child calls return their parents should return lists of lists, final result
    #should be an n x 2 list of lists
    def backtrace(i, j, alignment_a, alignment_b):
        #base case: (i, j) = (0, 0)
        if i == 0 and j == 0:
            #return list of lists, for easier concatenation
            return [[alignment_a, alignment_b]]
        
        results = []
        #match or mismatch
        if direction_matrix[i, j][0] == DIAG_EDGE:
            results = results + backtrace(i-1, j-1, a[i] + alignment_a, b[j] + alignment_b)
        #gap in a: shift column, don't shift row ("consume" character in b, insert gap in a)
        if direction_matrix[i, j][1] == RIGHT_EDGE:
            #new last cell = S[i, j-1]
            results = results + backtrace(i, j-1, "_" + alignment_a, b[j] + alignment_b)        #gap in b
        #gap in b: shift row, don't shift column; new cell = S[i-1, j]
        if direction_matrix[i, j][2] == DOWN_EDGE:
            results = results + backtrace(i-1, j, a[i] + alignment_a, "_" + alignment_b)
        return results
    
    return backtrace(max_i, max_j, "", "")