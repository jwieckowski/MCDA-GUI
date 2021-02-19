import { all } from 'redux-saga/effects'

import { watchResults } from './../../data/sagas/results'
import { watchCorrelations } from './../../data/sagas/correlations'

export default function * rootSaga () {
  yield all([
    watchResults(),
    watchCorrelations()
  ])
}