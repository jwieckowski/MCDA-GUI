import { combineReducers } from 'redux'

import calculations from './../../data/reducers/calculations.js'
import results from './../../data/reducers/results.js'
import correlations from './../../data/reducers/correlations.js'

export default combineReducers({
  calculations,
  results,
  correlations
})