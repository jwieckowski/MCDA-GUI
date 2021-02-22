import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Layout from './Layout.jsx'
import i18n from '../i18n.js'

const mockStore = configureStore([])

describe('<Layout />', () => {
    let store 
    let initialRoute
    
    beforeEach(() => {
        store = mockStore()
        initialRoute = ['/']
    })
    afterEach(cleanup)

    it('renders layout', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
              <MemoryRouter initialEntries={initialRoute}>
                <I18nextProvider i18n={i18n}>
                  <Layout />
                </I18nextProvider>
              </MemoryRouter>
            </Provider>
        )
        expect(queryByTestId('layout-id')).toBeTruthy()
    })
})