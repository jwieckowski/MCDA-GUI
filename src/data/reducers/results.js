import actions from '../../constants'

const initialState = {
    results: undefined,
    fetchingResults: false,
    resultsError: undefined,
}

const getResultsStart = (state, action) => {
  return {
    ...state,
    fetchingResults: true,
    resultsError: undefined
  }
}

const getResultsSuccess = (state, action) => {
  return {
    ...state,
    results: action.results,
    fetchingResults: false,
  }
}

const getResultsFail = (state, action) => {
  return {
    ...state,
    fetchingResults: false,
    resultsError: action.error
  }
}

export default function results (state = initialState, action) {
  switch (action.type) {

    case actions.GET_RESULTS_START:
      return getResultsStart(state, action)
    case actions.GET_RESULTS_SUCCESS:
      return getResultsSuccess(state, action)
    case actions.GET_RESULTS_FAIL:
      return getResultsFail(state, action)
    
    default:
      return state
  }
}
  