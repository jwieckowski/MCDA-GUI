import actions from '../../constants/index.js'

export function setCorrelationsMethod (method) {
    return {
      type: actions.SET_CORRELATIONS_METHOD,
      method
    }
  }
  
  export function addCorrelationsResults (results, rankings, label) {
    return {
      type: actions.CORRELATIONS_ADD_ELEMENTS,
      results,
      rankings,
      label
    }
  }
  
  export function removeCorrelationsResults (results, rankings, label) {
    return {
      type: actions.CORRELATIONS_REMOVE_ELEMENTS,
      results,
      rankings,
      label
    }
  }
  
  export function resetCorrelations () {
    return {
      type: actions.CORRELATIONS_RESET_ELEMENTS
    }
  }
  
  export function getCorrelationsResults (data) {
    return {
      type: actions.GET_CORRELATIONS,
      data
    }
  } 
  
  export function getCorrelationsResultsStart() {
    return {
      type: actions.GET_CORRELATIONS_START
    }
  }
  
  export function getCorrelationsResultsSuccess(correlations) {
    return {
      type: actions.GET_CORRELATIONS_SUCCESS,
      correlations
    }
  }
  
  
  export function getCorrelationsResultsFail(error) {
    return {
      type: actions.GET_CORRELATIONS_FAIL,
      error
    }
  }