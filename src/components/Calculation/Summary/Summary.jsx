import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  info: {
      width: '40%',
      height: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'start'
  }
})

const Summary = () => {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <Grid className={classes.info}>
        <Typography variant='h5'>MCDA method: TOPSIS</Typography>
        <Typography variant='h5'>Normalization: none / minmax</Typography>
        <Typography variant='h5'>Decision matrix: input / file</Typography>
      </Grid>
      <Grid className={classes.info}>
        <Typography variant='h5'>Alternatives: 10</Typography>
        <Typography variant='h5'>Criteria: 5</Typography>
        <Typography variant='h5'>Criteria weights: input / method</Typography>
      </Grid>
    </Grid>
  )
}

export default Summary