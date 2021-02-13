import axios from 'axios'

export function * getResults (data) {
  const res = yield axios.get('http://127.0.0.1:5000/results', {
    params: {
      method: data.method.toLowerCase(),
      normalization: data.normalization,
      alternatives: data.alternatives,
      criteria: data.criteria,
      matrix: data.matrix,
      weightsType: data.weightsType,
      weightsValue: data.weightsValue,
      preferenceFunction: data.preferenceFunction
    }
  })
  return res.data
}