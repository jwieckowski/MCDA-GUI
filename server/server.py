from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

from definitions import all_info
from helpers import calculate_correlations, calculate_preferences

app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/', methods=['GET'])
def home():
    return jsonify(all_info)

@app.route('/methods', methods=['GET'])
def methods():
    return jsonify(all_info['methods'])

@app.route('/normalizationsMethods', methods=['GET'])
def normalizationsMethods():
    return jsonify(all_info['normalizations'])

@app.route('/correlationsMethods', methods=['GET'])
def correlationsMethods():
    return jsonify(all_info['correlations'])

@app.route('/weightsMethods', methods=['GET'])
def weightsMethods():
    return jsonify(all_info['weights'])

@app.route('/correlations', methods=['GET'])
def correlations():
    method = request.args.get('method')
    results = request.args.getlist('results[]')
    rankings = request.args.getlist('rankings[]')

    correlations = calculate_correlations(method, results, rankings)

    print(method)
    print(correlations)

    return jsonify(correlations.tolist())

@app.route('/results', methods=['GET'])
def results():
    method = request.args.get('method')
    normalization = request.args.get('normalization')
    matrix = request.args.getlist('matrix[]')
    weightsType = request.args.getlist('weightsType[]')
    weightsValue = request.args.getlist('weightsValue[]')
    weightsMethod = request.args.get('weightsMethod')
    preferenceFunction = request.args.get('preferenceFunction')

    result, m = calculate_preferences(method, normalization, matrix, weightsMethod, weightsValue, weightsType, preferenceFunction)

    print('''Method: {}\nMatrix:\n {}'''.format(method, m))
    print(result)

    return jsonify(result.tolist())

app.run()