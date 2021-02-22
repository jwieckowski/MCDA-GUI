import reducer from '../results.js'
import actionTypes from '../../../constants/index.js'
import * as actions from '../../actions/results.js'

describe('results reducer', () => {
    const initialState = {
        results: undefined,
        fetchingResults: false,
        resultsError: undefined,
    }

    const changeState = {
        results: [0.5, 0.56, 0.78],
        fetchingResults: true,
        resultsError: new Error('new Error'),
    }

    test('returning initial state of reducer', () => {
        expect(reducer(initialState, {})).toEqual(initialState)
    })

    test(`handling ${actionTypes.GET_RESULTS_START}`, () => {
        expect(reducer(initialState, actions.getResultsStart())).toEqual({
            ...initialState,
            fetchingResults: changeState.fetchingResults
        })
    })

    test(`handling ${actionTypes.GET_RESULTS_SUCCESS}`, () => {
        expect(reducer(initialState, actions.getResultsSuccess(changeState.results))).toEqual({
            ...initialState,
            results: changeState.results
        })
    })

    test(`handling ${actionTypes.GET_RESULTS_FAIL}`, () => {
        expect(reducer(initialState, actions.getResultsFail(changeState.resultsError))).toEqual({
            ...initialState,
            resultsError: changeState.resultsError
        })
    })
})