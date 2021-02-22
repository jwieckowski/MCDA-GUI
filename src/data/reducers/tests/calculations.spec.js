import reducer from '../calculations.js'
import actionTypes from '../../../constants/index.js'
import * as actions from '../../actions/calculations.js'

describe('calculations reducer', () => {
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
        formFilled: false
    }

    const changeState = {
        method: 'TOPSIS',
        normalization: 'sum',
        weightsType: ['Profit', 'Profit', 'Cost'],
        weightsValue: [0.4, 0.4, 0.2],
        weightsMethod: 'equal',
        alternatives: 4,
        criteria: 3,
        matrix: [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]],
        matrixFile: 'file',
        preferenceFunction: 'usual',
        formFilled: true
    }
    const testError = new Error('new error')

    test('returning initial state of reducer', () => {
        expect(reducer(initialState, {})).toEqual(initialState)
    })

    test(`handling ${actionTypes.CALCULATION_SET_METHOD}`, () => {
        expect(reducer(initialState, actions.setMethod(changeState.method))).toEqual({
            ...initialState,
            method: changeState.method
        })
    })

    test(`handling ${actionTypes.CALCULATION_SET_NORMALIZATION}`, () => {
        expect(reducer(initialState, actions.setNormalization(changeState.normalization))).toEqual({
            ...initialState,
            normalization: changeState.normalization
        })
    })

    test(`handling ${actionTypes.CALCULATION_SET_WEIGHTS_TYPE}`, () => {
        expect(reducer(initialState, actions.setWeightsType(changeState.weightsType))).toEqual({
            ...initialState,
            weightsType: changeState.weightsType
        })
    })

    test(`handling ${actionTypes.CALCULATION_SET_WEIGHTS_VALUE}`, () => {
        expect(reducer(initialState, actions.setWeightsValue(changeState.weightsValue))).toEqual({
            ...initialState,
            weightsValue: changeState.weightsValue
        })
    })

    test(`handling ${actionTypes.CALCULATION_SET_WEIGHTS_METHOD}`, () => {
        expect(reducer(initialState, actions.setWeightsMethod(changeState.weightsMethod))).toEqual({
            ...initialState,
            weightsMethod: changeState.weightsMethod
        })
    })

    test(`handling ${actionTypes.CALCULATION_SET_ALTERNATIVES}`, () => {
        expect(reducer(initialState, actions.setAlternatives(changeState.alternatives))).toEqual({
            ...initialState,
            alternatives: changeState.alternatives
        })
    })

    test(`handling ${actionTypes.CALCULATION_SET_CRITERIA}`, () => {
        expect(reducer(initialState, actions.setCriteria(changeState.criteria))).toEqual({
            ...initialState,
            criteria: changeState.criteria
        })
    })

    test(`handling ${actionTypes.CALCULATION_SET_MATRIX}`, () => {
        expect(reducer(initialState, actions.setMatrix(changeState.matrix))).toEqual({
            ...initialState,
            matrix: changeState.matrix
        })
    })

    test(`handling ${actionTypes.CALCULATION_SET_MATRIX_FILE}`, () => {
        expect(reducer(initialState, actions.setMatrixFile(changeState.matrixFile))).toEqual({
            ...initialState,
            matrixFile: changeState.matrixFile
        })
    })

    test(`handling ${actionTypes.CALCULATION_SET_PREFERENCE_FUNCTION}`, () => {
        expect(reducer(initialState, actions.setPreferenceFunction(changeState.preferenceFunction))).toEqual({
            ...initialState,
            preferenceFunction: changeState.preferenceFunction
        })
    })

    test(`handling ${actionTypes.CALCULATION_CHECK_FORM}`, () => {
        expect(reducer(initialState, actions.checkForm(initialState))).toEqual({
            ...initialState,
        })
    })

    test(`handling ${actionTypes.CALCULATION_CHECK_FORM}`, () => {
        expect(reducer(changeState, actions.checkForm(changeState))).toEqual({
            ...changeState
        })
    })

    test(`handling ${actionTypes.CALCULATION_RESET_FORM}`, () => {
        expect(reducer(initialState, actions.resetForm())).toEqual({
            ...initialState
        })
    })
})