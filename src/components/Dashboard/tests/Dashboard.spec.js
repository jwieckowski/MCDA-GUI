import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Dashboard from '../Dashboard.jsx'
import i18n from '../../../i18n.js'

const mockStore = configureStore([])

describe('<Dashboard />', () => {
    let store 
    let initialRoute
    
    beforeEach(() => {
        store = mockStore()
        initialRoute = ['/']
    })
    afterEach(cleanup)

    it('renders dashboard component', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
              <MemoryRouter initialEntries={initialRoute}>
                <I18nextProvider i18n={i18n}>
                  <Dashboard />
                </I18nextProvider>
              </MemoryRouter>
            </Provider>
        )
        expect(queryByTestId('dashboard-id')).toBeTruthy()
    })

    it('not renders dashboard component with random data-testid', () => {
      const { queryByTestId } = render(
          <Provider store={store}>
            <MemoryRouter initialEntries={initialRoute}>
              <I18nextProvider i18n={i18n}>
                <Dashboard />
              </I18nextProvider>
            </MemoryRouter>
          </Provider>
      )
      expect(queryByTestId('some-id')).not.toBeTruthy()
  })
})