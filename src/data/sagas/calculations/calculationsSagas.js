import { getResultsStart, getResultsSuccess, getResultsFail } from './../../actions/calculations.js'
import { put, call } from 'redux-saga/effects'

import { getResults } from './../../api/calculationsAPI.js'

export function * getResultsSaga ({ data }) {
  yield put(getResultsStart())
  try {
    const results = yield call(getResults, data)
    yield put(getResultsSuccess(results))
  } catch (error) {
    yield put(getResultsFail(error))
  }
}