import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Layout from './views/Layout.jsx'
import Dashboard from './components/Dashboard'
import Calculation from './components/Calculation'
import History from './components/History'
import Methods from './components/Methods'
import Contact from './components/Contact'

const App = () => (
  <Layout>
    <Switch>
      <Route path='/' exact component={Dashboard}/>
      <Route path='/calculation' component={Calculation}/>
      <Route path='/history' component={History} />
      <Route path='/methods' component={Methods}/>
      <Route path='/contact' component={Contact}/>
      <Redirect to='/' />
    </Switch>
  </Layout>
)

export default App