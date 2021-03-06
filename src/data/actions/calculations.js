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
