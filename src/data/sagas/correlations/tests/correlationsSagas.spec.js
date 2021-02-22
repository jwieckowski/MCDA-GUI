import { takeLatest, put, call } from 'redux-saga/effects'
import { watchCorrelations } from '../index.js'

import { getCorrelationsResultsSaga } from '../correlationsSagas.js'
import { getCorrelationsResults } from '../../../api/correlationsAPI.js'

import actionTypes from '../../../../constants/index.js'
import * as actions from '../../../actions/correlations.js'
import sagaHelper from 'redux-saga-testing'

describe('correlations watcher', () => {
    test('takeLatest effects', () => {
        const gen = watchCorrelations()

        expect(gen.next().value).toEqual(takeLatest(actionTypes.GET_CORRELATIONS, getCorrelationsResultsSaga))
        expect(gen.next().done).toEqual(true)
    })
})

describe('get correlations results saga', () =>{
    describe('get successfully correlations results', () => {
        const mockData = [[1, 2], [1, 2]]
        const mockCorrelations = [[1, 1], [1, 1]]
        const it = sagaHelper(getCorrelationsResultsSaga({ data: mockData }))
        
        it('start gettting correlations results', (results) => {
            expect(results).toEqual(put(actions.getCorrelationsResultsStart()))
        })
        
        it('successfully get correlations results from API call', (results) => {
            expect(results).toEqual(call(getCorrelationsResults, mockData))
            return mockCorrelations
        })
        
        it('put success from getting correlations results', (results) => {
            expect(results).toEqual(put(actions.getCorrelationsResultsSuccess(mockCorrelations)))
        })

        it('actions done', (results) => {
            expect(results).toBeUndefined()
        })
    })    
    
    describe('throw error while getting correlations results', () => {
        const mockData = [[1, 2], [1, 2]]
        const error = new Error('new Error')
        const it = sagaHelper(getCorrelationsResultsSaga({ data: mockData }))
        
        it('start gettting correlations results', (results) => {
            expect(results).toEqual(put(actions.getCorrelationsResultsStart()))
        })
        
        it('successfully get correlations results from API call', (results) => {
            expect(results).toEqual(call(getCorrelationsResults, mockData))
            return error
        })
        
        it('put success from getting correlations results', (results) => {
            expect(results).toEqual(put(actions.getCorrelationsResultsFail(error)))
        })

        it('actions done', (results) => {
            expect(results).toBeUndefined()
        })
    })   
})


