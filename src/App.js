import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Layout from './views/Layout.jsx'
import Dashboard from './components/Dashboard'

const App = () => (
  <Layout>
    <Switch>
      <Route path='/' exact component={Dashboard}/>
      <Redirect to='/' />
    </Switch>
  </Layout>
)

export default App