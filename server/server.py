from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import json
import pymcdm
import numpy as np

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

def calc_promethee(matrix, weights, types, pref_func):

    p = np.random.rand(matrix.shape[1]) / 2
    q = np.random.rand(matrix.shape[1]) / 2 + 0.5

    method = mcda_methods['promethee'](preference_function=pref_func)
    result = method(matrix, weights, types, p=p, q=q)
    return result

def calc_spotis(matrix, weights, types):

    bounds = np.vstack((
        np.min(matrix, axis=0),
        np.max(matrix, axis=0)
    )).T
    method = mcda_methods['spotis']()
    result = method(matrix, weights, types, bounds)
    return result

def calc_comet(matrix, weights, types):

    cvalues = np.vstack((
        np.min(matrix, axis=0),
        np.mean(matrix, axis=0),
        np.max(matrix, axis=0)
    )).T
    method = mcda_methods['comet'](cvalues,
                           rate_function=pymcdm.methods.COMET.topsis_rate_function(weights, types))
    result = method(matrix)
    return result

def calculate_results(method, normalization, matrix, weights, types, pref_func=None):

    if method == 'promethee':
        return calc_promethee(matrix, weights, types, pref_func)
    elif method == 'spotis':
        return calc_spotis(matrix, weights, types)
    elif method == 'comet':
        return calc_comet(matrix, weights, types)
    else:
        m = None
        if normalization == 'none':
            m = mcda_methods[method]()
        else:
            m = mcda_methods[method](normalization_methods[normalization])
        result = m(matrix, weights, types)
        return result


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

@app.route('/results', methods=['GET'])
def results():
    method = request.args.get('method')
    normalization = request.args.get('normalization')
    alternatives = request.args.get('alternatives')
    criteria = request.args.get('criteria')
    matrix = request.args.getlist('matrix[]')
    weightsType = request.args.getlist('weightsType[]')
    weightsValue = request.args.getlist('weightsValue[]')
    preferenceFunction = request.args.get('preferenceFunction')

    m = np.array([m.strip('][').split(',') for m in matrix]).astype(np.float)
    w = np.array([float(w) for w in weightsValue])
    t = np.array([1 if t == 'Profit' else -1 for t in weightsType])

    result = calculate_results(method, normalization, m, w, t, preferenceFunction)

    print('''Method: {}\nMatrix:\n {}'''.format(method, m))
    print(result)

    return jsonify(result.tolist())

app.run()
