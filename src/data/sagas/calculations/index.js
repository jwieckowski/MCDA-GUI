import { takeLatest } from 'redux-saga/effects'
import actions from './../../../constants/index.js'
import { getResultsSaga, getCorrelationsResultsSaga } from './calculationsSagas.js'

export function * watchCalculations () {
  yield takeLatest(actions.CALCULATION_RESULTS, getResultsSaga)
  yield takeLatest(actions.CALCULATION_CORRELATIONS, getCorrelationsResultsSaga)
}