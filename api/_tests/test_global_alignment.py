#run with  python -m tests.test_global_alignment from api directory
#or  pytest tests/ from same
from _utils import needleman_wunsch as nw

strings = ["ATTGAA", "ATGGA"]
match, mis, gap = 1, -1, -2
score_matrix, direction_matrix = nw.generate_needleman_wunsch(strings, match, mis, gap)
print(score_matrix)
alignments = nw.find_all_matches(strings=strings, 
                                 score_matrix=score_matrix, 
                                 direction_matrix=direction_matrix)
print(alignments)