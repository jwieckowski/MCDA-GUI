import actions from '../../constants/index.js'


export function getResults (data) {
    return {
      type: actions.GET_RESULTS,
      data
    }
  } 
  
  export function getResultsStart() {
    return {
      type: actions.GET_RESULTS_START
    }
  }
  
  export function getResultsSuccess(results) {
    return {
      type: actions.GET_RESULTS_SUCCESS,
      results
    }
  }
  
  export function getResultsFail(error) {
    return {
      type: actions.GET_RESULTS_FAIL,
      error
    }
  }