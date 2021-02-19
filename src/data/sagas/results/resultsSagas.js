import { 
  getResultsStart,
  getResultsSuccess,
  getResultsFail
} from '../../actions/results.js'
import { put, call } from 'redux-saga/effects'

import { getResults } from './../../api/resultsAPI.js'

export function * getResultsSaga ({ data }) {
  yield put(getResultsStart())
  try {
    const results = yield call(getResults, data)
    yield put(getResultsSuccess(results))
  } catch (error) {
    yield put(getResultsFail(error))
  }
}
