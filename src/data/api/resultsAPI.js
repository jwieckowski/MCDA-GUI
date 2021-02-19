import axios from 'axios'

export function * getResults (data) {
  const res = yield axios.get('http://127.0.0.1:5000/results', {
    params: {
      method: data.method.toLowerCase(),
      normalization: data.normalization,
      alternatives: data.alternatives,
      criteria: data.criteria,
      matrix: data.matrix,
      matrixFile: data.matrixFile,
      weightsType: data.weightsType,
      weightsValue: data.weightsValue,
      weightsMethod: data.weightsMethod === undefined ? data.weightsMethod : data.weightsMethod.toLowerCase(),
      preferenceFunction: data.preferenceFunction
    }
  })
  return res.data
}
