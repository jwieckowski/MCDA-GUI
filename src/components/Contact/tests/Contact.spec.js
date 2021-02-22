import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import userEvent from '@testing-library/user-event'

import Contact from '../Contact.jsx'
import i18n from '../../../i18n.js'

const mockStore = configureStore([])

describe('<Contact />', () => {
    let store 
    let initialRoute
    
    beforeEach(() => {
        store = mockStore()
        initialRoute = ['/contact']
    })
    afterEach(cleanup)

    it('renders contact component', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
              <MemoryRouter initialEntries={initialRoute}>
                <I18nextProvider i18n={i18n}>
                  <Contact />
                </I18nextProvider>
              </MemoryRouter>
            </Provider>
        )
        expect(queryByTestId('contact-id')).toBeTruthy()
    })

    it('not renders contact component with random data-testid', () => {
      const { queryByTestId } = render(
          <Provider store={store}>
            <MemoryRouter initialEntries={initialRoute}>
              <I18nextProvider i18n={i18n}>
                <Contact />
              </I18nextProvider>
            </MemoryRouter>
          </Provider>
      )
      expect(queryByTestId('some-id')).not.toBeTruthy()
    })
    
    it('open new tab (target: blank) after clicked on link', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
              <MemoryRouter initialEntries={initialRoute}>
                <I18nextProvider i18n={i18n}>
                  <Contact />
                </I18nextProvider>
              </MemoryRouter>
            </Provider>
        )
        userEvent.click(queryByTestId('link-id'))
        expect(screen.queryByTestId('link-id')).toBeVisible()
    })
})