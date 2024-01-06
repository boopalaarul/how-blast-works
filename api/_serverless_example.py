import time
import json

from flask import Flask, request

#originally thought i needed a separate flask app for each API route, however when one of the routes
#specified in vercel.json are matched and the request is forwarded to the serverless function, the
#request's route doesn't actually change or get trimmed: so if the request was originally made to
#"/api/nw", then the serverless function needs to have a route specifically for POST requests with a
#"application/json" Content-Type addressed to "/api/nw"

#side effect: if Flask app has a route "/api/nw/", get an ugly redirect loop where Flask redirects to 
#"/api/nw", which then matches the route in vercel.json, causing it to get sent to Flask again...
    #avoid this by having the Flask route be "/api/nw" and the original request have that as well

#all the other files in /api aside from api.py are prefixed with '_' so that Vercel doesn't turn them 
#into serverless functions (can only have 12 per app on the free tier) this '_' treatment doesn't have
#to be done on venv, seemingly because venv is in the gitignore
print("Entering API")

# import N-W module-- only this kind of import works on serverless, meanwhile the other kind of import
from ._utils import needleman_wunsch as nw

print("Imported needleman wunsch", nw.generate_needleman_wunsch)

app = Flask(__name__)

@app.post('/api/nw')
def get_global_alignments():
    """Gives React app the score matrix, direction matrix, and all alignments
    for a given pair of strings and bonus/penalty score weights."""

    print("Entering function", request)

    parameters = request.get_json()

    # seem to be unable to get the request json. so something about it isn't right. could it be
    # that the request doesn't have a body?
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

    #first thing is to just make the other api log these, then can figure out how to
    #disassemble/contain within components

    print("Finished function")

    return ({
        "input_form" : json.dumps(parameters),
        "score_matrix" : json.dumps(score_nested_list), 
        "direction_matrix" : json.dumps(direction_nested_list),
        "alignments" : json.dumps(alignments)
    })