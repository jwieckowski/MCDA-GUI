import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainLabel: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  results: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'auto'
  },
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  text: {
    width: '120px',
    margin: '5px 0px',
  },
  numbers: {
    width: '120px',
    margin: '5px 0px',
    textAlign: 'center'
  }
})

const CorrelationTable = () => {
  const classes = useStyles()

  const { correlationsMethod, correlations, fetchingCorrelations, correlationsError } = useSelector(state => state.calculations)

  const getMethods = () => JSON.parse(window.localStorage['results']).map(r => r.method)

  const getColumns = (row) => {
    return row.map(r => {
      return (
        <Typography className={classes.numbers}>{r}</Typography>
      )
    })
  }

  const getRows = (results) => {
    return results.map((row, ind) => {
      return (
        <Grid className={classes.row} key={ind}>
          <Typography className={classes.text}>{getMethods()[ind]}</Typography>
          {getColumns(row)}
        </Grid>
      )
    })
  }

  let content = <Typography variant='h3'>Loading...</Typography>
  if (!fetchingCorrelations) {
    if (!correlationsError) {
      content = (
        <Grid>
          <Grid className={classes.mainLabel}>
            <Typography variant='h5'>
              {
                correlations !== undefined
                  ? `Wyniki`
                  : 'Wybierz rankingi do porównania'
              }
            </Typography>
            <Typography variant='h6'>
              {correlations !== undefined && correlationsMethod}
            </Typography>
          </Grid>
          {
            correlations !== undefined &&
            <Grid className={classes.results}>
              <Grid className={classes.row}>
                <Typography className={classes.text}>Methods</Typography>
                {getMethods().map(method => {
                  return (
                    <Typography className={classes.numbers}>{method}</Typography>
                  )
                })}
              </Grid>
              {getRows(correlations)}
            </Grid>
          }
        </Grid>
      )
    } else {
      content = <Typography variant='h3'>Error...</Typography>
    }
  }

  return (
    <Grid className={classes.root}>
      {content}
    </Grid>
  )
}
export default CorrelationTable