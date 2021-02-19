import { 
  getCorrelationsResultsStart,
  getCorrelationsResultsSuccess,
  getCorrelationsResultsFail 
} from '../../actions/correlations.js'
import { put, call } from 'redux-saga/effects'

import { getCorrelationsResults } from './../../api/correlationsAPI.js'

export function * getCorrelationsResultsSaga ({ data }) {
  yield put(getCorrelationsResultsStart())
  try {
    const results = yield call(getCorrelationsResults, data)
    yield put(getCorrelationsResultsSuccess(results))
  } catch (error) {
    yield put(getCorrelationsResultsFail(error))
  }
}