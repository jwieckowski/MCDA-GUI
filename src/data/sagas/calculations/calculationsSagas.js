import { 
  getResultsStart,
  getResultsSuccess,
  getResultsFail,
  getCorrelationsResultsStart,
  getCorrelationsResultsSuccess,
  getCorrelationsResultsFail 
} from './../../actions/calculations.js'
import { put, call } from 'redux-saga/effects'

import { getResults, getCorrelationsResults } from './../../api/calculationsAPI.js'

export function * getResultsSaga ({ data }) {
  yield put(getResultsStart())
  try {
    const results = yield call(getResults, data)
    yield put(getResultsSuccess(results))
  } catch (error) {
    yield put(getResultsFail(error))
  }
}

export function * getCorrelationsResultsSaga ({ data }) {
  yield put(getCorrelationsResultsStart())
  try {
    const results = yield call(getCorrelationsResults, data)
    yield put(getCorrelationsResultsSuccess(results))
  } catch (error) {
    yield put(getCorrelationsResultsFail(error))
  }
}