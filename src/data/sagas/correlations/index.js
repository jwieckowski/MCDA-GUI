import { takeLatest } from 'redux-saga/effects'
import actions from '../../../constants/index.js'
import { getCorrelationsResultsSaga } from './correlationsSagas.js'

export function * watchCorrelations () {
  yield takeLatest(actions.GET_CORRELATIONS, getCorrelationsResultsSaga)
}