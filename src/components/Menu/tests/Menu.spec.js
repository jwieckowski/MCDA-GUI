import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Menu from '../Menu.jsx'
import i18n from '../../../i18n.js'

const mockStore = configureStore([])

describe('<Menu />', () => {
    let store 
    let initialRoute
    
    beforeEach(() => {
        store = mockStore()
        initialRoute = ['/']
    })
    afterEach(cleanup)

    it('renders menu component', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
              <MemoryRouter initialEntries={initialRoute}>
                <I18nextProvider i18n={i18n}>
                  <Menu />
                </I18nextProvider>
              </MemoryRouter>
            </Provider>
        )
        expect(queryByTestId('menu-id')).toBeTruthy()
    })

    it('renders menu component with active contact tab', () => {
      const { getByText } = render(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/contact']}>
              <I18nextProvider i18n={i18n}>
                <Menu />
              </I18nextProvider>
            </MemoryRouter>
          </Provider>
      )
      expect(getByText('Contact')).toBeTruthy()
  })
})