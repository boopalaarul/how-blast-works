import time
from flask import Flask

# import N-W module
import needleman_wunsch

app = Flask(__name__)

@app.get('/nw/<string:string_a>/<string:string_b>')
def get_NW_matrices(string_a, string_b):
    #return dictionary of results, converts to json object for response
    return ({
        "string_a": string_a, 
        "string_b": string_b
    })
