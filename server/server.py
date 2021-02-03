from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import pymcdm

app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

mcda_methods = {
    'topsis': pymcdm.methods.TOPSIS,
    'vikor': pymcdm.methods.VIKOR,
    'promethee': pymcdm.methods.PROMEHTEE_II,
    'copras': pymcdm.methods.COPRAS,
    'spotis': pymcdm.methods.SPOTIS,
    'comet': pymcdm.methods.COMET
}

normalization_methods = {
    'minmax': pymcdm.normalizations.minmax_normalization,
    'max': pymcdm.normalizations.max_normalization,
    'sum': pymcdm.normalizations.sum_normalization,
    'vector': pymcdm.normalizations.vector_normalization,
    'logarithmic': pymcdm.normalizations.logaritmic_normalization,
}

correlation_methods = {
    'spearman': pymcdm.correlations.spearman,
    'pearson': pymcdm.correlations.pearson,
    'weighted_spearman': pymcdm.correlations.weighted_spearman,
    'rank_similarity_coef': pymcdm.correlations.rank_similarity_coef,
    'kendall_tau': pymcdm.correlations.kendall_tau,
    'goodman_kruskal_gamma': pymcdm.correlations.goodman_kruskal_gamma
}

weights_methods = {
    'equal': pymcdm.weights.equal,
    'entropy': pymcdm.weights.entropy,
    'standard_deviation': pymcdm.weights.standard_deviation
}

all_info = {
    'methods': [k for k in mcda_methods.keys()],
    'normalizations': [k for k in normalization_methods.keys()],
    'correlations': [k for k in correlation_methods.keys()],
    'weights': [k for k in weights_methods.keys()]
}

@app.route('/', methods=['GET'])
def home():
    return jsonify(all_info)

@app.route('/methods', methods=['GET'])
def methods():
    return jsonify(all_info['methods'])

@app.route('/normalizations', methods=['GET'])
def normalizations():
    return jsonify(all_info['normalizations'])

@app.route('/correlations', methods=['GET'])
def correlations():
    return jsonify(all_info['correlations'])

@app.route('/weights', methods=['GET'])
def weights():
    return jsonify(all_info['weights'])

@app.route('/calculation', method=['GET'])
def calculation():
    method = request.args.get('method')
    matrix = request.args.get('matrix')
    weights = request.args.get('weights')
    types = request.args.get('types')
    result = []
    return result

app.run()
