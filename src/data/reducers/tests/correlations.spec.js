import reducer from '../correlations.js'
import actionTypes from '../../../constants/index.js'
import * as actions from '../../actions/correlations.js'

describe('correlations reducer', () => {
    const initialState = {
        correlationsMethod: undefined,
        correlationsResults: undefined,
        correlationsRankings: undefined,

        correlations: undefined,
        labels: undefined,
        fetchingCorrelations: false,
        correlationsError: undefined
    }

    const changeState = {
        correlationsMethod: 'spearman',
        correlationsResults: [[0.5, 0.6, 0.7], [0.9, 0.7, 0.5]],
        correlationsRankings: [[1, 2, 3], [3, 2, 1]],

        correlations: [[1, 1], [1, 1]],
        labels: ['TOPSIS', 'PROMETHEE'],
        fetchingCorrelations: true,
        correlationsError: new Error('new error')
    }

    test('returning initial state of reducer', () => {
        expect(reducer(initialState, {})).toEqual(initialState)
    })

    test(`handling ${actionTypes.SET_CORRELATIONS_METHOD}`, () => {
        expect(reducer(initialState, actions.setCorrelationsMethod(changeState.method))).toEqual({
            ...initialState,
            method: changeState.method
        })
    })

    test(`handling ${actionTypes.CORRELATIONS_ADD_ELEMENTS}`, () => {
        expect(reducer(initialState, actions.addCorrelationsResults(
            changeState.correlationsResults[0],
            changeState.correlationsRankings[0], 
            changeState.labels[0]
        ))).toEqual({
            ...initialState,
            correlationsResults: [changeState.correlationsResults[0]],
            correlationsRankings: [changeState.correlationsRankings[0]], 
            labels: [changeState.labels[0]]
        })
    })

    test(`handling ${actionTypes.CORRELATIONS_REMOVE_ELEMENTS}`, () => {
        expect(reducer(changeState, actions.removeCorrelationsResults(
            changeState.correlationsResults[0],
            changeState.correlationsRankings[0], 
            changeState.labels[0]
        ))).toEqual({
            ...changeState,
            correlationsResults: [changeState.correlationsResults[1]],
            correlationsRankings: [changeState.correlationsRankings[1]], 
            labels: [changeState.labels[1]]
        })
    })

    test(`handling ${actionTypes.CORRELATIONS_RESET_ELEMENTS}`, () => {
        expect(reducer(initialState, actions.resetCorrelations())).toEqual({
            ...initialState,
        })
    })

    test(`handling ${actionTypes.GET_CORRELATIONS_START}`, () => {
        expect(reducer(initialState, actions.getCorrelationsResultsStart())).toEqual({
            ...initialState,
            fetchingCorrelations: changeState.fetchingCorrelations
        })
    })

    test(`handling ${actionTypes.GET_CORRELATIONS_SUCCESS}`, () => {
        expect(reducer(initialState, actions.getCorrelationsResultsSuccess(changeState.correlations))).toEqual({
            ...initialState,
            correlations: changeState.correlations
        })
    })

    test(`handling ${actionTypes.GET_CORRELATIONS_FAIL}`, () => {
        expect(reducer(initialState, actions.getCorrelationsResultsFail(changeState.correlationsError))).toEqual({
            ...initialState,
            correlationsError: changeState.correlationsError
        })
    })

})