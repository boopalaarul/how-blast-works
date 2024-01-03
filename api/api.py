import time
import json

from flask import Flask, request

# import N-W module
import utils.needleman_wunsch as nw

app = Flask(__name__)

print(nw.generate_needleman_wunsch)

#is it too much to just have the react components store the "correct" grid value as a prop,
#and then access that prop to do the error check???
#no, in fact that's exactly what i should be doing

#so now the data flow is 1) ask flask for the correct matrices and alignments (means i need
#to finish the recursive aligner, use bimm hw to crosscheck/test) 2) store them within the 
#react grid squares 3) when user wants to submit their answer, use the stored values as
#answer key
    #means also that when flask responds to request for matrices, it should send them back in
    #the form that makes it easiest for me to implement the "answer grid" (want to do nested
    #maps, basically mapping a row traverser onto each row and cell traverse onto each cell)
    #so whatever json monstrosity i eject here, on the other side it needs to be legible
    #as an array of arrays.

#just remembered that the direction matrix is a 3 dimensional array because multiple
#directions can be valid. 1) adds additional layer of complexity onto whatever we're doing
#here 2) means that error checking is now about checking equality of sets, not a straight
#"right or wrong"

@app.post('/nw/')
def get_global_alignments():
    """Gives React app the score matrix, direction matrix, and all alignments
    for a given pair of strings and bonus/penalty score weights."""

    parameters = request.get_json()
    strings = [parameters["stringA"], parameters["stringB"]]
    score_matrix, direction_matrix = nw.generate_needleman_wunsch(strings, 
                                                                  int(parameters["match"]), 
                                                                  int(parameters["mis"]), 
                                                                  int(parameters["gap"]))
    score_nested_list = score_matrix.tolist()
    direction_nested_list = direction_matrix.tolist()

    #should already be a list-- first thing tomorrow, implement this. use bimm lab 3 i think
    alignments = nw.find_all_matches(strings, score_matrix, direction_matrix)

    #first thing is to just make the other api log these, then can figure out how to
    #disassemble/contain within components
    return ({
        "score_matrix": json.dumps(score_nested_list), 
        "direction_matrix": json.dumps(direction_nested_list),
        "alignments" : json.dumps(alignments)
    })