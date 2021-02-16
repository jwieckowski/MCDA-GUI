import actions from '../../constants/index.js'

export function setMethod (method) {
  return {
    type: actions.CALCULATION_SET_METHOD,
    method
  }
}

export function setNormalization (normalization) {
  return {
    type: actions.CALCULATION_SET_NORMALIZATION,
    normalization
  }
}

export function setWeightsType (weightsType) {
  return {
    type: actions.CALCULATION_SET_WEIGHTS_TYPE,
    weightsType
  }
}

export function setWeightsValue (weightsValue) {
  return {
    type: actions.CALCULATION_SET_WEIGHTS_VALUE,
    weightsValue
  }
}

export function setWeightsMethod (weightsMethod) {
  return {
    type: actions.CALCULATION_SET_WEIGHTS_METHOD,
    weightsMethod
  }
}

export function setAlternatives (alternatives) {
  return {
    type: actions.CALCULATION_SET_ALTERNATIVES,
    alternatives
  }
}

export function setCriteria (criteria) {
  return {
    type: actions.CALCULATION_SET_CRITERIA,
    criteria
  }
}

export function setMatrix (matrix) {
  return {
    type: actions.CALCULATION_SET_MATRIX,
    matrix
  }
}

export function setMatrixFile (matrixFile) {
  return {
    type: actions.CALCULATION_SET_MATRIX_FILE,
    matrixFile
  }
}

export function setPreferenceFunction (preferenceFunction) {
  return {
    type: actions.CALCULATION_SET_PREFERENCE_FUNCTION,
    preferenceFunction
  }
}

export function checkForm () {
  return {
    type: actions.CALCULATION_CHECK_FORM
  }
}

export function resetForm () {
  return {
    type: actions.CALCULATION_RESET_FORM
  }
}

export function getResults (data) {
  return {
    type: actions.CALCULATION_RESULTS,
    data
  }
} 

export function getResultsStart() {
  return {
    type: actions.CALCULATION_RESULTS_START
  }
}

export function getResultsSuccess(results) {
  return {
    type: actions.CALCULATION_RESULTS_SUCCESS,
    results
  }
}

export function getResultsFail(error) {
  return {
    type: actions.CALCULATION_RESULTS_FAIL,
    error
  }
}

export function setCorrelationsMethod (method) {
  return {
    type: actions.CALCULATION_SET_CORRELATIONS_METHOD,
    method
  }
}

export function addCorrelationsResults (results, rankings) {
  return {
    type: actions.CALCULATION_ADD_ELEMENTS,
    results,
    rankings
  }
}

export function removeCorrelationsResults (index) {
  return {
    type: actions.CALCULATION_REMOVE_ELEMENTS,
    index
  }
}

export function getCorrelationsResults (data) {
  return {
    type: actions.CALCULATION_CORRELATIONS,
    data
  }
} 

export function getCorrelationsResultsStart() {
  return {
    type: actions.CALCULATION_CORRELATIONS_START
  }
}

export function getCorrelationsResultsSuccess(correlations) {
  return {
    type: actions.CALCULATION_CORRELATIONS_SUCCESS,
    correlations
  }
}


export function getCorrelationsResultsFail(error) {
  return {
    type: actions.CALCULATION_CORRELATIONS_FAIL,
    error
  }
}
