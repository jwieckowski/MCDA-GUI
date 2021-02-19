import actions from '../../constants'

const initialState = {
  correlationsMethod: undefined,
  correlationsResults: undefined,
  correlationsRankings: undefined,

  correlations: undefined,
  labels: undefined,
  fetchingCorrelations: false,
  correlationsError: undefined
}

const setCorrelationsMethod = (state, action) => {
  return {
    ...state,
    correlationsMethod: action.method
  }
}

const addCorrelationsElements = (state, action) => {
  return {
    ...state,
    correlationsResults: state.correlationsResults === undefined 
      ? [action.results]
      : [...state.correlationsResults, action.results],
    correlationsRankings: state.correlationsRankings === undefined
      ? [action.rankings]
      : [...state.correlationsRankings, action.rankings],
    labels: state.labels === undefined
      ? [action.label]
      : [...state.labels, action.label]
  }
}

const removeCorrelationsElements = (state, action) => {
  const index = state.correlationsResults.map(r => JSON.stringify(r)).indexOf(JSON.stringify(action.results))
  
  return {
    ...state,
    correlationsResults: [...state.correlationsResults.filter((r, ind) => ind !== index)],
    correlationsRankings: [...state.correlationsRankings.filter((r, ind) => ind !== index)],
    labels: [...state.labels.filter((l, ind) => ind !== index)]
  }
}

const resetCorrelations = (state, action) => {
  return {
    ...state,
    correlationsMethod: undefined,
    correlationsResults: undefined,
    correlationsRankings: undefined,
    correlations: undefined,
    labels: undefined,
    fetchingCorrelations: false,
    correlationsError: undefined
  }
}

const getCorrelationsResultsStart = (state, action) => {
  return {
    ...state,
    fetchingCorrelations: true,
    correlationsError: undefined
  }
}

const getCorrelationsResultsSuccess = (state, action) => {
  return {
    ...state,
    correlations: action.correlations,
    fetchingCorrelations: false,
  }
}

const getCorrelationsResultsFail = (state, action) => {
  return {
    ...state,
    fetchingCorrelations: false,
    correlationsError: action.error
  }
}

export default function calculations (state = initialState, action) {
  switch (action.type) {    
    case actions.SET_CORRELATIONS_METHOD:
      return setCorrelationsMethod(state, action)
    case actions.CORRELATIONS_ADD_ELEMENTS:
      return addCorrelationsElements(state, action)
    case actions.CORRELATIONS_REMOVE_ELEMENTS:
      return removeCorrelationsElements(state, action)
    case actions.CORRELATIONS_RESET_ELEMENTS:
      return resetCorrelations(state, action)

    case actions.GET_CORRELATIONS_START:
      return getCorrelationsResultsStart(state, action)
    case actions.GET_CORRELATIONS_SUCCESS:
      return getCorrelationsResultsSuccess(state, action)
    case actions.GET_CORRELATIONS_FAIL:
      return getCorrelationsResultsFail(state, action)
    default:
      return state
  }
}
  