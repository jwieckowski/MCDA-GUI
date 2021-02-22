import { takeLatest, put, call } from 'redux-saga/effects'
import { watchResults } from '../index.js'

import { getResultsSaga } from '../resultsSagas.js'
import { getResults } from '../../../api/resultsAPI.js'

import actionTypes from '../../../../constants/index.js'
import * as actions from '../../../actions/results.js'
import sagaHelper from 'redux-saga-testing'

describe('results watcher', () => {
    test('takeLatest effects', () => {
        const gen = watchResults()

        expect(gen.next().value).toEqual(takeLatest(actionTypes.GET_RESULTS, getResultsSaga))
        expect(gen.next().done).toEqual(true)
    })
})

describe('get results saga', () =>{
    describe('get successfully results', () => {
        const mockData = {
            method: 'TOPSIS',
            normalization: 'sum',
            alternatives: 2,
            criteria: 2,
            matrix: [[1, 2], [2, 1]],
            matrixFile: undefined,
            weightsType: ['Profit', 'Cost'],
            weightsValue: [0.5, 0.5],
            weightsMethod: 'None',
            preferenceFunction: 'None'
        }
        const mockResults = [0.5, 0.6]
        const it = sagaHelper(getResultsSaga({ data: mockData }))
        
        it('start gettting results', (results) => {
            expect(results).toEqual(put(actions.getResultsStart()))
        })
        
        it('successfully get results from API call', (results) => {
            expect(results).toEqual(call(getResults, mockData))
            return mockResults
        })
        
        it('put success from getting results', (results) => {
            expect(results).toEqual(put(actions.getResultsSuccess(mockResults)))
        })

        it('actions done', (results) => {
            expect(results).toBeUndefined()
        })
    })    
    
    describe('throw error while getting results', () => {
        const mockData = {
            method: 'TOPSIS',
            normalization: 'sum',
            alternatives: 2,
            criteria: 2,
            matrix: [[1, 2], [2, 1]],
            matrixFile: undefined,
            weightsType: ['Profit', 'Cost'],
            weightsValue: [0.5, 0.5],
            weightsMethod: 'None',
            preferenceFunction: 'None'
        }
        const error = new Error('new Error')
        const it = sagaHelper(getResultsSaga({ data: mockData }))
        
        it('start gettting results', (results) => {
            expect(results).toEqual(put(actions.getResultsStart()))
        })
        
        it('successfully get results from API call', (results) => {
            expect(results).toEqual(call(getResults, mockData))
            return error
        })
        
        it('put success from getting results', (results) => {
            expect(results).toEqual(put(actions.getResultsFail(error)))
        })

        it('actions done', (results) => {
            expect(results).toBeUndefined()
        })
    })   
})


