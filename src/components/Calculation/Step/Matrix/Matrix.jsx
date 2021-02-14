import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import Settings from './Settings'

import { setMatrix } from './../../../../data/actions/calculations.js'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  settings: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  numberInput: {
    width: '80px'
  },
  matrix: {
    width: '100%',
    marginTop: '20px'
  },
  label: {
    width: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  column: {
    width: '70px'
  }
})

const Matrix = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { alternatives, criteria, matrix, matrixFile } = useSelector((state) => state.calculations)

  useEffect(() => {
    if (matrixFile !== undefined) return
    if (matrix !== undefined && alternatives === matrix.length && criteria === matrix[0].length) return
    if (Number.isNaN(alternatives) || Number.isNaN(criteria)) return
    dispatch(setMatrix([...Array(alternatives)].map(() => Array(criteria).fill(0))))
  }, [criteria, alternatives])

  const handleInput = (event, row, col) => {
    dispatch(setMatrix(matrix.map((r, index) => {
      return index === row
        ? r.map((c, ind) => ind === col ? parseFloat(event.target.value) : c)
        : r
    })))
  }

  const getColumns = (row) => {
    const content = []
    for (let i = 0; i < criteria; i++) {
      content.push(
        <TextField
            key={i}
            type="number"
            value={matrix === undefined ? 0 : matrix[row][i]}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
              min: 0
            }}
            variant="outlined"
            className={classes.column}
            onChange={(e) => handleInput(e, row, i)}
          />
      )
    }
    return content
  }

  const getRows = () => {
    if (alternatives === undefined || criteria === undefined) return
    const content = []

    for (let i = 0; i < alternatives; i++) {
      content.push(
        <Grid className={classes.row} key={i}>
          <Grid className={classes.label}><Typography>A{i+1}</Typography></Grid>
          {getColumns(i).map(column => column)}
        </Grid>
      )
    }
    return content
  }

  return (
    <Grid className={classes.root}>
      <Grid>
        <Settings />
        <Grid className={classes.matrix}>
          {getRows()}
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Matrix