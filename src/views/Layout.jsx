import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

import Menu from './../components/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100vw',
    minWidth: '750px'
  }
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid container maxwidth='xs' className={classes.root} data-testid='layout-id'>
      <Menu/>
      { children }
    </Grid>
  )
}

export default Layout