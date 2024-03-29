import time
import json

from flask import Flask, request

print("Entering API")

# import N-W module... #"import abc" imports a resource directly, while "from X import Y" implies 
# a module "X". got "no known parent module" error because folder holding api.py wasn't recognized
# as a module, and that was because it didn't have an __init__.py
# but now it does, so this file should work on both local and serverless, don't need another one
from ._utils import needleman_wunsch as nw

print("Imported needleman wunsch", nw.generate_needleman_wunsch)

app = Flask(__name__)

@app.post('/api/nw')
def get_global_alignments():
    """Gives React app the score matrix, direction matrix, and all alignments
    for a given pair of strings and bonus/penalty score weights."""

    print("Entering function", request)

    parameters = request.get_json()

    print("Got request json", parameters)

    strings = [parameters["stringA"], parameters["stringB"]]
    score_matrix, direction_matrix = nw.generate_needleman_wunsch(strings, 
                                                                  int(parameters["match"]), 
                                                                  int(parameters["mis"]), 
                                                                  int(parameters["gap"]))
    score_nested_list = score_matrix.tolist()
    direction_nested_list = direction_matrix.tolist()

    #should already be a list-- first thing tomorrow, implement this. use bimm lab 3 i think
    alignments = nw.find_all_matches(strings, score_matrix, direction_matrix)

    print("Finished function")

    #first thing is to just make the other api log these, then can figure out how to
    #disassemble/contain within components
    return ({
        "input_form" : json.dumps(parameters),
        "score_matrix" : json.dumps(score_nested_list), 
        "direction_matrix" : json.dumps(direction_nested_list),
        "alignments" : json.dumps(alignments)
    })