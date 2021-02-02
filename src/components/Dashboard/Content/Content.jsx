import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Menu = () => {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      a
    </Grid>
  )
}
export default Menu