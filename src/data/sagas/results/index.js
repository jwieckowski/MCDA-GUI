import { takeLatest } from 'redux-saga/effects'
import actions from '../../../constants/index.js'
import { getResultsSaga } from './resultsSagas.js'

export function * watchResults () {
  yield takeLatest(actions.GET_RESULTS, getResultsSaga)
}