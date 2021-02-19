import axios from 'axios'

export function * getCorrelationsResults (data) {
  const res = yield axios.get('http://127.0.0.1:5000/correlations', {
    params: {
      method: data.correlationsMethod,
      results: data.correlationsResults,
      rankings: data.correlationsRankings
    }
  })
  return res.data
}