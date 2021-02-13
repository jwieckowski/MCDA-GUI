import actions from '../../constants'

const initialState = {
    method: undefined,
    normalization: undefined,
    weightsType: undefined,
    weightsValue: undefined,
    weightsMethod: undefined,
    alternatives: undefined,
    criteria: undefined,
    matrix: undefined,
    matrixFile: undefined,
    preferenceFunction: undefined,
    formFilled: false,
    results: undefined,
    fetchingResults: false,
    resultsError: undefined
}

const setMethod = (state, action) => {
    return {
        ...state,
        method: action.method
    }
}

const setNormalization = (state, action) => {
    return {
        ...state,
        normalization: action.normalization
    }
}


const setWeightsType = (state, action) => {
    return {
        ...state,
        weightsType: action.weightsType
    }
}


const setWeightsValue = (state, action) => {
    return {
        ...state,
        weightsValue: action.weightsValue
    }
}


const setWeightsMethod = (state, action) => {
    return {
        ...state,
        weightsMethod: action.weightsMethod
    }
}


const setAlternatives = (state, action) => {
    return {
        ...state,
        alternatives: action.alternatives
    }
}


const setCriteria = (state, action) => {
    return {
        ...state,
        criteria: action.criteria
    }
}

const setMatrix = (state, action) => {
    return {
        ...state,
        matrix: action.matrix
    }
}

const setMatrixFile = (state, action) => {
    return {
        ...state,
        matrixFile: action.matrixFile
    }
}

const setPreferenceFunction = (state, action) => {
  return {
      ...state,
      preferenceFunction: action.preferenceFunction
  }
}

const checkForm = (state, action) => {
  // checked filled
  let flag = [state.method, state.alternatives, state.criteria, state.weightsType].every(x => x !== undefined)
  flag = flag && [state.normalization, state.preferenceFunction].some(x => x !== undefined)
  flag = flag && [state.weightsValue, state.weightsMethod].some(x => x !== undefined) && [state.matrix, state.matrixFile].some(x => x !== undefined)
  // check correctness
  if (state.matrix !== undefined) {
    flag = flag && (state.matrix.reduce((total, array) => {
      return total + array.reduce((sum, current) => sum + current)
    })[0] !== 0)
  }
  if (state.weightsMethod === undefined) {
    flag = flag && (state.weightsValue.reduce((total, current) => total + current) === 1)
  }
  return {
      ...state,
      formFilled: flag
  }
}

const resetForm = (state, action) => {
  return initialState
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

export default function calculations (state = initialState, action) {
  switch (action.type) {
    case actions.CALCULATION_SET_METHOD:
      return setMethod(state, action)
    case actions.CALCULATION_SET_NORMALIZATION:
      return setNormalization(state, action)
    case actions.CALCULATION_SET_WEIGHTS_VALUE: 
      return setWeightsValue(state, action)
    case actions.CALCULATION_SET_WEIGHTS_TYPE:
      return setWeightsType(state, action)
    case actions.CALCULATION_SET_WEIGHTS_METHOD:
      return setWeightsMethod(state, action)
    case actions.CALCULATION_SET_ALTERNATIVES:
      return setAlternatives(state, action)
    case actions.CALCULATION_SET_CRITERIA:
      return setCriteria(state, action)
    case actions.CALCULATION_SET_MATRIX:
      return setMatrix(state, action)
    case actions.CALCULATION_SET_MATRIX_FILE:
      return setMatrixFile(state, action)
    case actions.CALCULATION_SET_PREFERENCE_FUNCTION:
      return setPreferenceFunction(state, action)
    case actions.CALCULATION_CHECK_FORM:
      return checkForm(state, action)
    case actions.CALCULATION_RESET_FORM:
      return resetForm(state, action)
    case actions.CALCULATION_RESULTS_START:
      return getResultsStart(state, action)
    case actions.CALCULATION_RESULTS_SUCCESS:
      return getResultsSuccess(state, action)
    case actions.CALCULATION_RESULTS_FAIL:
      return getResultsFail(state, action)
    default:
      return state
  }
}
  