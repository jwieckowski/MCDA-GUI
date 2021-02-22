import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import userEvent from '@testing-library/user-event'

import Methods from '../Methods.jsx'
import i18n from '../../../i18n.js'

const mockStore = configureStore([])

describe('<Methods />', () => {
    let store 
    let initialRoute
    
    beforeEach(() => {
        store = mockStore()
        initialRoute = ['/methods']
    })
    afterEach(cleanup)

    it('renders methods component', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
              <MemoryRouter initialEntries={initialRoute}>
                <I18nextProvider i18n={i18n}>
                  <Methods />
                </I18nextProvider>
              </MemoryRouter>
            </Provider>
        )
        expect(queryByTestId('methods-id')).toBeTruthy()
    })
    
    it('open new tab after clicked on link', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
              <MemoryRouter initialEntries={initialRoute}>
                <I18nextProvider i18n={i18n}>
                  <Methods />
                </I18nextProvider>
              </MemoryRouter>
            </Provider>
        )
        userEvent.click(queryByTestId('tab1'))
        expect(queryByTestId('tab1')).toHaveFocus()
    })
})