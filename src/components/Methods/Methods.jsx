import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import methods from './../../public/methods.js'
import Panel from './Panel'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Methods = () => {
  const classes = useStyles()
  const [active, setActive] = useState(0)

  const handleChange = (e, value) => {
    setActive(value)
  }

  return (
    <Grid className={classes.root} data-testid='methods-id'>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={active}
        onChange={handleChange}
        aria-label="Method tabs"
        className={classes.tabs}
      >
        {methods.map((method, index) => {
          return (
            <Tab label={method.method} key={method.id} data-testid={`tab${index}`}/>
          )
        })}
      </Tabs>
      {methods.map((method, index) => {
        return (
          <Panel
            key={index}
            value={active}
            index={index}
            method={method.method}
            abbreviation={method.abbreviation}
            images={method.images}
            data-testid={`panel${index}`}
          />
        )
      })}
    </Grid>
  )
}
export default Methods