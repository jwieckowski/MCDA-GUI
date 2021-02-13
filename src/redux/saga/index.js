import { all } from 'redux-saga/effects'

import { watchCalculations } from './../../data/sagas/calculations'

export default function * rootSaga () {
  yield all([
    watchCalculations()
  ])
}