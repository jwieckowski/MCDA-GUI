import React from 'react'
import { useSelector } from 'react-redux'
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
  const info = useSelector((state) => state.calculations)

  const getInfo = () => {
    return (
      <Typography variant='h5'>
        { info.method !== 'PROMETHEE'
          ? <>Normalization: {info.normalization === undefined ? '' : info.normalization}</>
          : <>Preference: {info.preferenceFunction === undefined ? '' : info.preferenceFunction}</>
        }
      </Typography>
    )  
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.info}>
        <Typography variant='h5'>MCDA method: {info.method === undefined ? '' : info.method}</Typography>
        {getInfo()}
        <Typography variant='h5'>Decision matrix: {info.matrixFile === undefined ? 'input' : 'file'}</Typography>
      </Grid>
      <Grid className={classes.info}>
        <Typography variant='h5'>Alternatives: {info.alternatives === undefined ? '' : info.alternatives}</Typography>
        <Typography variant='h5'>Criteria: {info.criteria === undefined ? '' : info.criteria}</Typography>
        <Typography variant='h5'>Criteria weights: {info.weightsMethod === undefined ? 'input' : info.weightsMethod}</Typography>
      </Grid>
    </Grid>
  )
}

export default Summary